import { useState, useEffect, useRef, useCallback } from 'react'
import {
  useLocalParticipant,
  useRemoteParticipants,
  ControlBar,
} from '@livekit/components-react'
import { API_BASE, DEEPGRAM_KEY, DEEPL_KEY, ELEVENLABS_KEY, TARGET_LANG } from '../config'
import TranscriptPanel from './TranscriptPanel'
import './MeetingRoom.css'

// AI 处理类
class AIProcessor {
  constructor() {
    this.deepgramWs = null
    this.transcriptCallback = null
    this.translationCallback = null
  }

  async start({ deepgramKey, deeplKey, elevenlabsKey, onTranscript, onTranslation }) {
    this.transcriptCallback = onTranscript
    this.translationCallback = onTranslation

    if (!deepgramKey) {
      console.warn('Deepgram key not set, AI processing disabled')
      return
    }

    // 连接 Deepgram 流式 ASR
    const deepgramUrl = 'wss://api.deepgram.com/v1/listen?model=nova-3&language=multi&smart_format=true&punctuate=true&diarize=true'

    this.deepgramWs = new WebSocket(deepgramUrl)
    this.deepgramWs.onopen = () => {
      console.log('[Deepgram] Connected')
    }

    this.deepgramWs.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data)
        const transcript = data.channel?.alternatives?.[0]?.transcript?.trim()
        const isFinal = data.is_final

        if (!transcript) return

        this.transcriptCallback?.({
          text: transcript,
          isFinal,
          speaker: data.channel?.alternatives?.[0]?.words?.[0]?.speaker ?? null,
        })

        // 仅在完整句子时翻译
        if (isFinal && deeplKey) {
          this.translate(transcript, deeplKey)
        }
      } catch (err) {
        console.error('[Deepgram] parse error', err)
      }
    }

    this.deepgramWs.onerror = (err) => console.error('[Deepgram] Error', err)
    this.deepgramWs.onclose = () => console.log('[Deepgram] Closed')
  }

  async translate(text, deeplKey) {
    try {
      const res = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${deeplKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text,
          target_lang: TARGET_LANG,
        }),
      })

      if (!res.ok) {
        console.warn('[DeepL] non-OK response', res.status)
        return
      }
      const data = await res.json()
      const translated = data.translations?.[0]?.text

      if (translated) {
        this.translationCallback?.({
          original: text,
          translated,
          lang: TARGET_LANG,
        })
      }
    } catch (err) {
      console.error('[DeepL] Error', err)
    }
  }

  sendAudio(blob) {
    if (this.deepgramWs?.readyState === WebSocket.OPEN) {
      this.deepgramWs.send(blob)
    }
  }

  stop() {
    if (this.deepgramWs && this.deepgramWs.readyState !== WebSocket.CLOSED) {
      this.deepgramWs.close()
    }
    this.deepgramWs = null
  }
}

export default function MeetingRoom({ roomName, userName, targetLang, targetLangName, onLeave }) {
  // 这些 hook 必须在 LiveKitRoom 子树内使用
  const localParticipant = useLocalParticipant()?.localParticipant
  const remoteParticipants = useRemoteParticipants()

  const [transcripts, setTranscripts] = useState([])
  const [translations, setTranslations] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [audioStarted, setAudioStarted] = useState(false)
  const [audioError, setAudioError] = useState('')
  const [micLevel, setMicLevel] = useState(0)

  const aiProcessorRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const processorRef = useRef(null)
  const micStreamRef = useRef(null)

  // 采集本地麦克风音频并送入 AI 处理
  const setupAudioCapture = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        channelCount: 1,
        sampleRate: 16000,
      },
    })

    micStreamRef.current = stream

    // 使用 AudioContext 采集原始 PCM（手机浏览器必须在用户交互后才能创建/恢复）
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx({ sampleRate: 16000 })
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }
    audioContextRef.current = ctx

    const source = ctx.createMediaStreamSource(stream)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 512
    analyserRef.current = analyser
    const processor = ctx.createScriptProcessor(4096, 1, 1)
    processorRef.current = processor

    source.connect(analyser)
    analyser.connect(processor)
    // 不要连到 ctx.destination，避免回声；手机会回放
    // processor.connect(ctx.destination)

    // 每 ~250ms 发送一块音频
    let buffer = []
    processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0)
      buffer.push(new Float32Array(inputData))

      if (buffer.length >= 6) {
        // 合并 buffer
        const totalLen = buffer.reduce((sum, b) => sum + b.length, 0)
        const merged = new Float32Array(totalLen)
        let offset = 0
        for (const b of buffer) {
          merged.set(b, offset)
          offset += b.length
        }
        buffer = []

        // 转为 16-bit PCM
        const pcm16 = new Int16Array(merged.length)
        for (let i = 0; i < merged.length; i++) {
          pcm16[i] = Math.max(-32768, Math.min(32767, Math.round(merged[i] * 32767)))
        }

        // 转为 WAV 格式（Deepgram 需要）
        const wav = encodeWAV(pcm16, 16000)
        aiProcessorRef.current?.sendAudio(wav)
      }
    }

    console.log('[Audio] Mic capture started, sampleRate:', ctx.sampleRate)
  }, [])

  // 启动音频采集 + AI 翻译（必须由用户点击触发，避免手机浏览器拦截）
  const startTranslation = useCallback(async () => {
    setAudioError('')
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('当前浏览器不支持麦克风')
      }

      const ai = aiProcessorRef.current ?? new AIProcessor()
      aiProcessorRef.current = ai

      await ai.start({
        deepgramKey: DEEPGRAM_KEY,
        deeplKey: DEEPL_KEY,
        elevenlabsKey: ELEVENLABS_KEY,
        onTranscript: (t) => {
          if (t.isFinal) {
            setTranscripts((prev) => [
              ...prev.slice(-50),
              { ...t, id: Date.now() + Math.random(), time: new Date() },
            ])
          }
        },
        onTranslation: (t) => {
          setTranslations((prev) => [
            ...prev.slice(-50),
            { ...t, id: Date.now() + Math.random(), time: new Date() },
          ])
        },
      })

      await setupAudioCapture()
      setIsProcessing(true)
      setAudioStarted(true)
    } catch (err) {
      console.error('[Translation] Start failed:', err)
      setAudioError(err?.message || String(err))
    }
  }, [setupAudioCapture])

  // 麦克风音量采样（用于判断是否真的拿到音频）
  useEffect(() => {
    if (!audioStarted) return
    const analyser = analyserRef.current
    if (!analyser) return

    let raf = requestAnimationFrame(function tick() {
      const buf = new Uint8Array(analyser.fftSize)
      analyser.getByteTimeDomainData(buf)
      let sum = 0
      for (let i = 0; i < buf.length; i++) {
        const v = (buf[i] - 128) / 128
        sum += v * v
      }
      setMicLevel(Math.sqrt(sum / buf.length))
      raf = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [audioStarted])

  // 监听连接状态
  useEffect(() => {
    if (localParticipant) {
      setConnectionStatus('connected')
    }
  }, [localParticipant])

  // 卸载时清理
  useEffect(() => {
    return () => {
      aiProcessorRef.current?.stop()
      micStreamRef.current?.getTracks().forEach((t) => t.stop())
      processorRef.current?.disconnect()
      analyserRef.current?.disconnect()
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const allParticipants = [localParticipant, ...(remoteParticipants ?? [])].filter(Boolean)

  return (
    <div className="meeting-room">
      {/* 顶部栏 */}
      <header className="meeting-header">
        <div className="header-left">
          <div className="room-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            {roomName || '房间'}
          </div>
          <div className={`status-dot ${connectionStatus}`} />
        </div>
        <div className="header-center">
          <div className={`ai-status ${isProcessing ? 'active' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            AI 翻译 {isProcessing ? '运行中' : '启动中...'}
          </div>
          {!audioStarted && (
            <button className="start-translation-btn" onClick={startTranslation}>
              🎙️ 点此启用麦克风翻译
            </button>
          )}
          {audioStarted && (
            <div className="mic-level" title="麦克风音量">
              <div className="mic-bar" style={{ width: `${Math.min(micLevel * 300, 100)}%` }} />
            </div>
          )}
          {audioError && (
            <div className="audio-error">⚠ {audioError}</div>
          )}
        </div>
        <div className="header-right">
          <button className="leave-btn" onClick={onLeave}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            离开
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="meeting-body">
        {/* 视频网格（demo 阶段 video={false}，先跑通音频流 + 字幕） */}
        <div className="video-section">
          <div className="video-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <p className="vp-title">音频会议模式</p>
            <p className="vp-subtitle">
              {allParticipants.length === 0
                ? '等待连接...'
                : `${allParticipants.length} 人在线`}
            </p>
            {allParticipants.length > 0 && (
              <ul className="vp-list">
                {allParticipants.map((p) => (
                  <li key={p.identity}>
                    {p.name || p.identity}
                    {p.identity === userName ? '（你）' : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 字幕区 */}
        <div className="transcript-section">
          <TranscriptPanel transcripts={transcripts} translations={translations} />
        </div>
      </div>

      {/* 控制栏 */}
      <div className="meeting-controls">
        <ControlBar variation="optimized" controls={{ camera: false, screenShare: false, chat: false }} />
      </div>
    </div>
  )
}

// WAV 编码器（给 Deepgram）
function encodeWAV(samples, sampleRate) {
  const bytesPerSample = 2
  const numChannels = 1
  const blockAlign = numChannels * bytesPerSample
  const byteRate = sampleRate * blockAlign
  const dataSize = samples.length * bytesPerSample
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)

  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeStr(0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeStr(8, 'WAVE')
  writeStr(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bytesPerSample * 8, true)
  writeStr(36, 'data')
  view.setUint32(40, dataSize, true)

  let offset = 44
  for (let i = 0; i < samples.length; i++, offset += 2) {
    view.setInt16(offset, samples[i], true)
  }

  return buffer
}