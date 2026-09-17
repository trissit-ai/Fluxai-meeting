// API 配置
// 部署到 GitHub Pages 时使用 Railway 后端地址
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://fluxai-meeting-production.up.railway.app'

// LiveKit 云配置（免费 tier）
// 公开的 URL 和 API Key，可以放在前端
// API Secret 永远不放前端，由后端签 token
export const LIVEKIT_CONFIG = {
  url: import.meta.env.VITE_LIVEKIT_URL || 'wss://zoomdemo-fue0so67.livekit.cloud',
  apiKey: import.meta.env.VITE_LIVEKIT_API_KEY || 'APIgmF7LbbgtfbB',
  apiSecret: import.meta.env.VITE_LIVEKIT_API_SECRET || '',
}

// Deepgram API Key（免费注册获取）
// Demo 阶段直接放在前端，仅 3 人测试；正式产品必须走后端代理
export const DEEPGRAM_KEY = import.meta.env.VITE_DEEPGRAM_KEY || '29322527dfb037822bcc25286070002e6b0a3222'

// DeepL API Key（免费注册获取）
export const DEEPL_KEY = import.meta.env.VITE_DEEPL_KEY || '5a0b4a37-9fa8-4e70-8bc3-2e4d9c480827:fx'

// ElevenLabs API Key（免费注册获取）
export const ELEVENLABS_KEY = import.meta.env.VITE_ELEVENLABS_KEY || 'sk_bdf380a1947d54c3a0633f401f80e97a61d4f976406d5b00'

// 翻译目标语言
export const TARGET_LANG = 'ZH'
export const TARGET_LANG_NAME = '中文'