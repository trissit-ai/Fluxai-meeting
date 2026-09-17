"""
AI Meeting - Backend Server
提供 LiveKit Token 发放、AI 翻译管线（可选，前端也可直接调用）
"""

import os
import uuid
import httpx
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import livekit
from livekit import api

load_dotenv()

app = FastAPI(title="AI Meeting API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ Models ============
class TokenRequest(BaseModel):
    room: str
    username: str
    livekit_url: str | None = None
    livekit_api_key: str | None = None
    livekit_api_secret: str | None = None


class TranslateRequest(BaseModel):
    text: str
    target_lang: str = "ZH"
    deepl_key: str | None = None


# ============ Translate Proxy (DeepL) ============
# 浏览器直连 api-free.deepl.com 会被 CORS 拦截，改为后端代理
@app.post("/api/translate")
async def translate(req: TranslateRequest):
    """
    代理 DeepL 翻译，绕开浏览器 CORS 限制
    """
    deepl_key = req.deepl_key or os.getenv("DEEPL_KEY", "")
    if not deepl_key:
        raise HTTPException(status_code=400, detail="DeepL key not configured")
    if not req.text.strip():
        return {"translated": ""}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                "https://api-free.deepl.com/v2/translate",
                headers={
                    "Authorization": f"DeepL-Auth-Key {deepl_key}",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data={"text": req.text, "target_lang": req.target_lang},
            )
            if resp.status_code != 200:
                raise HTTPException(status_code=resp.status_code, detail=f"DeepL error: {resp.text[:200]}")
            data = resp.json()
            translated = data.get("translations", [{}])[0].get("text", "")
            return {"translated": translated}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translate failed: {str(e)}")


class TokenResponse(BaseModel):
    token: str
    room: str
    username: str
    livekit_url: str


# ============ LiveKit Token ============
@app.post("/api/token", response_model=TokenResponse)
async def get_token(req: TokenRequest):
    """
    发放 LiveKit Room Token
    """
    # 优先使用请求中的配置，否则用环境变量
    livekit_url = req.livekit_url or os.getenv("LIVEKIT_URL", "")
    livekit_key = req.livekit_api_key or os.getenv("LIVEKIT_API_KEY", "")
    livekit_secret = req.livekit_api_secret or os.getenv("LIVEKIT_API_SECRET", "")

    if not livekit_key or not livekit_secret:
        raise HTTPException(
            status_code=400,
            detail="LiveKit credentials not configured. Please set LIVEKIT_API_KEY and LIVEKIT_API_SECRET"
        )

    if not livekit_url:
        raise HTTPException(
            status_code=400,
            detail="LiveKit URL not configured. Please set LIVEKIT_URL"
        )

    try:
        token = (
            api.AccessToken(livekit_key, livekit_secret)
            .with_identity(req.username)
            .with_name(req.username)
            .with_grants(api.VideoGrants(
                room=req.room,
                room_join=True,
                can_publish=True,
                can_subscribe=True,
                can_publish_data=True,
            ))
            .with_ttl(timedelta(hours=4))
            .to_jwt()
        )

        return TokenResponse(
            token=token,
            room=req.room,
            username=req.username,
            livekit_url=livekit_url,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Token generation failed: {str(e)}")


# ============ Health Check ============
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/")
async def root():
    return {
        "service": "AI Meeting Backend",
        "version": "1.0.0",
        "endpoints": {
            "POST /api/token": "Get LiveKit room token",
            "POST /api/translate": "DeepL translate proxy (CORS-safe)",
            "GET /health": "Health check",
        }
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8080"))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        log_level="info",
    )
