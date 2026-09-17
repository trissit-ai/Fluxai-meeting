# AI Meeting - 多语言实时翻译会议

> 任何人说话 → 实时翻译为中文 → 字幕 + 翻译语音

支持鸿蒙、iPhone、Android，通过浏览器直接访问，无需安装 App。

---

## 目录

- [快速开始](#快速开始)
- [手动安装](#手动安装)
- [配置说明](#配置说明)
- [使用方法](#使用方法)
- [架构说明](#架构说明)
- [故障排查](#故障排查)

---

## 快速开始

### 第一步：获取 API Keys（5 分钟）

| 服务 | 地址 | 免费额度 | 用途 |
|------|------|---------|------|
| **LiveKit Cloud** | [cloud.livekit.io](https://cloud.livekit.io) | 500 分钟/月 | 视频会议传输 |
| **Deepgram** | [console.deepgram.com](https://console.deepgram.com) | 200 分钟/月 | 语音识别（ASR） |
| **DeepL** | [deepl.com/pro-api](https://deepl.com/pro-api) | 免费账号有额度 | 机器翻译 |
| **ElevenLabs** | [elevenlabs.io](https://elevenlabs.io) | 免费账号有分钟数 | 语音合成（TTS） |

### 第二步：填写配置

```bash
cd meeting-ai

# 复制环境变量文件
cp backend/.env.example .env
cp frontend/.env.example .env

# 编辑 .env，填入上面获取的 API Keys
nano .env   # 或用任何编辑器
```

需要填入 `.env` 的内容：

```env
# LiveKit
LIVEKIT_URL=wss://your-project.cloud.livekit.livekit.cloud
LIVEKIT_API_KEY=your_key
LIVEKIT_API_SECRET=your_secret

# AI
DEEPGRAM_API_KEY=your_key
DEEPL_API_KEY=your_key
ELEVENLABS_API_KEY=your_key
```

### 第三步：启动服务

```bash
# 仅需 Docker（推荐）
docker compose up

# 或不用 Docker
cd backend && pip install -r requirements.txt && python main.py &
cd frontend && npm install && npm run dev
```

### 第四步：测试

1. 三人各自打开浏览器（任选一）：
   - **http://localhost:5173**（本地开发）
   - 或你的服务器地址（部署后）
2. 每人输入相同的**房间号**和各自的**名字**，点击"进入会议"
3. 允许麦克风权限
4. 开始说话——实时翻译字幕会出现

---

## 手动安装

### 前置要求

- Node.js 18+
- Python 3.12+
- Docker Desktop（可选）

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # 填入 API Keys
python main.py
```

服务运行在 `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # 填入相同 API Keys
npm run dev
```

访问 `http://localhost:5173`

---

## 配置说明

### LiveKit（必须）

1. 注册 [cloud.livekit.io](https://cloud.livekit.io)
2. 创建项目（Project）
3. 复制 API Key、API Secret、URL 到 `.env`

### Deepgram（必须，语音识别）

1. 注册 [console.deepgram.com](https://console.deepgram.com)
2. 在 API Keys 页面创建新 Key
3. 免费版 200 分钟/月，够三人测试用

### DeepL（必须，翻译）

1. 注册 DeepL 账号（免费版有额度限制）
2. 在 [deepl.com/pro-api](https://deepl.com/pro-api) 申请 API Key
3. DeepL 免费账号每月 50 万字符

### ElevenLabs（可选，TTS）

1. 注册 [elevenlabs.io](https://elevenlabs.io)
2. 获取 API Key
3. 免费账号每月有 10K 字符

---

## 使用方法

### 创建/加入房间

1. 输入**房间号**（3人输入相同即可加入同一会议）
2. 输入**你的名字**
3. 点击**进入会议**

### 功能说明

| 功能 | 说明 |
|------|------|
| **实时字幕** | 原语言 + 中文翻译同步显示 |
| **翻译字幕** | 右侧面板实时更新 |
| **视频通话** | 实时视频，支持多人 |
| **离开会议** | 点击右上角"离开" |

### 测试技巧

- 三个人分别在**不同设备**上打开（手机/电脑均可）
- 用**不同语言**说话测试（英文、日文、甚至中英混合）
- 打开**实时字幕**观察翻译效果

---

## 架构说明

```
┌─────────────────────────────────────────────────────────┐
│                      浏览器                              │
│  ┌──────────────┐   ┌──────────────────────────────┐  │
│  │ LiveKit SDK  │───│     React 前端               │  │
│  │  (视频通话)   │   │  ┌────────────────────────┐ │  │
│  └──────────────┘   │  │ AI 处理（浏览器端）     │ │  │
│                      │  │  Mic → Deepgram ASR     │ │  │
│                      │  │      → DeepL 翻译       │ │  │
│                      │  │      → 中文字幕         │ │  │
│                      │  └────────────────────────┘ │  │
│                      └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │    LiveKit Cloud       │
              │   (视频传输服务器)     │
              └───────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  后端（可选，Docker）                    │
│  FastAPI ── 提供 LiveKit Token 发放                     │
└─────────────────────────────────────────────────────────┘
```

### AI 处理管线（浏览器端直接运行）

```
麦克风音频
    ↓
Deepgram 流式 ASR（识别语种 + 转文字）
    ↓
DeepL 翻译（文字 → 中文）
    ↓
实时字幕 + 中文 TTS 语音（可选）
```

**优势**：无需后端服务器处理音频，减少延迟，保护隐私

---

## 故障排查

### "连接失败"或 Token 错误

- 检查 LiveKit 的 URL、API Key、API Secret 是否正确
- 确认 `.env` 文件中 LiveKit 配置完整

### 没有翻译字幕

- 检查 Deepgram 和 DeepL API Key 是否配置
- 确认麦克风权限已授权
- 打开浏览器控制台（F12）查看错误信息

### 音频无声音

- 检查浏览器音量设置
- 确认麦克风权限已授权

### 华为浏览器不能用

- 鸿蒙版 Chrome 内核基本支持 WebRTC
- 如果权限问题，尝试使用 Safari 或 Chrome

### 浏览器卡顿

- 关闭其他占用带宽的应用
- 尝试降低视频质量（LiveKit 控制栏里有选项）

---

## 项目结构

```
meeting-ai/
├── backend/            # FastAPI 后端
│   ├── main.py         # 主服务（Token 发放）
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/           # React + Vite 前端
│   ├── src/
│   │   ├── App.jsx         # 主应用
│   │   ├── config.js        # API 配置
│   │   └── components/
│   │       ├── JoinForm.jsx        # 加入房间表单
│   │       ├── MeetingRoom.jsx     # 会议室主界面 + AI 处理
│   │       └── TranscriptPanel.jsx # 实时字幕面板
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile.dev
├── docker-compose.yml
├── .env                 # 你的 API Keys（不提交到 Git）
└── README.md
```

---

## License

MIT
