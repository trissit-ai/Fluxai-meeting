// API 配置
// 部署后替换为实际后端地址
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

// LiveKit 云配置（免费 tier）
// 注册 https://cloud.livekit.io 获取
export const LIVEKIT_CONFIG = {
  url: import.meta.env.VITE_LIVEKIT_URL || 'wss://your-livekit.cloud/livekit',
  apiKey: import.meta.env.VITE_LIVEKIT_API_KEY || '',
  apiSecret: import.meta.env.VITE_LIVEKIT_API_SECRET || '',
}

// Deepgram API Key（免费注册获取）
export const DEEPGRAM_KEY = import.meta.env.VITE_DEEPGRAM_KEY || ''

// DeepL API Key（免费注册获取）
export const DEEPL_KEY = import.meta.env.VITE_DEEPL_KEY || ''

// ElevenLabs API Key（免费注册获取）
export const ELEVENLABS_KEY = import.meta.env.VITE_ELEVENLABS_KEY || ''

// 翻译目标语言
export const TARGET_LANG = 'ZH'
export const TARGET_LANG_NAME = '中文'
