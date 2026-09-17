import { useState, useEffect, useRef, useCallback } from 'react'
import {
  useLocalParticipant,
  useRemoteParticipants,
  useTracks,
  Track,
  ControlBar,
  ConnectionState,
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

      if (!res.ok) return
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
    this.deepgramWs?.close()
    this.deepgramWs = null
  }
}

export default function MeetingRoom({ roomName, userName, targetLang, targetLangName, onLeave }) {
  const { localParticipant } = useLocalParticipant()
  const remoteParticipants = useRemoteParticipants()

  const [transcripts, setTranscripts] = useState([])
  const [translations, setTranslations] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('connecting')

  const mediaRecorderRef = useRef(null)
  const aiProcessorRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const processorRef = useRef(null)
  const micStreamRef = useRef(null)

  // 启动 AI 音频处理
  const startAI = useCallback(async () => {
    if (!DEEPGRAM_KEY || !DEEPL_KEY) {
      console.warn('Missing API keys, AI disabled')
      return
    }

    const ai = new AIProcessor()
    aiProcessorRef.current = ai

    try {
      await ai.start({
        deepgramKey: DEEPGRAM_KEY,
        deeplKey: DEEPL_KEY,
        elevenlabsKey: ELEVENLABS_KEY,
        onTranscript: (t) => {
          if (t.isFinal) {
            setTranscripts(prev => [
              ...prev.slice(-50),
              { ...t, id: Date.now() + Math.random(), time: new Date() }
            ])
          }
        },
        onTranslation: (t) => {
          setTranslations(prev => [
            ...prev.slice(-50),
            { ...t, id: Date.now() + Math.random(), time: new Date() }
          ])
        },
      })
      setIsProcessing(true)
    } catch (err) {
      console.error('[AI] Start failed', err)
    }
  }, [])

  // 采集本地麦克风音频并送入 AI 处理
  const setupAudioCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 16000,
        }
      })

      micStreamRef.current = stream

      // 使用 AudioContext 采集原始 PCM
      const ctx = new AudioContext({ sampleRate: 16000 })
      audioContextRef.current = ctx

      const source = ctx.createMediaStreamSource(stream)
      const processor = ctx.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor

      source.connect(processor)
      processor.connect(ctx.destination)

      // 每 250ms 发送一块音频
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

      console.log('[Audio] Mic capture started')
    } catch (err) {
      console.error('[Audio] Mic access denied or error', err)
    }
  }, [])

  // 启动
  useEffect(() => {
    startAI()
    setupAudioCapture()

    return () => {
      // 清理
      aiProcessorRef.current?.stop()
      processorRef.current?.disconnect()
      audioContextRef.current?.close()
      micStreamRef.current?.getTracks().forEach(t => t.stop())
      mediaRecorderRef.current?.stop()
    }
  }, [startAI, setupAudioCapture])

  // 监听连接状态
  useEffect(() => {
    if (localParticipant) {
      setConnectionStatus('connected')
    }
  }, [localParticipant])

  const allParticipants = [localParticipant, ...remoteParticipants].filter(Boolean)

  return (
    <div className="meeting-room">
      {/* 顶部栏 */}
      <header className="meeting-header">
        <div className="header-left">
          <div className="room-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            {roomName}
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
        {/* 视频网格 */}
        <div className="video-section">
          <VideoGrid participants={allParticipants} localId={localParticipant?.identity} />
        </div>

        {/* 字幕区 */}
        <div className="transcript-section">
          <TranscriptPanel transcripts={transcripts} translations={translations} />
        </div>
      </div>

      {/* 控制栏 */}
      <div className="meeting-controls">
        <ControlBar variation="optimized" />
      </div>
    </div>
  )
}

// 视频网格
function VideoGrid({ participants, localId }) {
  const count = participants.length
  const gridClass = count === 1 ? 'grid-1' : count === 2 ? 'grid-2' : count <= 4 ? 'grid-4' : 'grid-6'

  return (
    <div className={`video-grid ${gridClass}`}>
      {participants.map((p) => {
        const isLocal = p.identity === localId
        return (
          <ParticipantTile key={p.identity} participant={p} isLocal={isLocal} />
        )
      })}
      {participants.length === 0 && (
        <div className="waiting-msg">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <p>等待其他人加入...</p>
        </div>
      )}
    </div>
  )
}

// 单个参会者窗口
function ParticipantTile({ participant, isLocal }) {
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter(t => t.participant.identity === participant.identity)

  const camTrack = tracks.find(t => t.source === Track.Source.Camera)
  const micTrack = tracks.find(t => t.source === Track.Source.Microphone)
  const isMuted = micTrack ? !micTrack.isMuted : false

  const identity = participant.identity || 'Unknown'
  const displayName = participant.name || identity

  return (
    <div className={`participant-tile ${isLocal ? 'local' : ''}`}>
      {camTrack ? (
        <ParticipantVideoTrack trackRef={camTrack} />
      ) : (
        <div className="video-off">
          <div className="avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </div>
      )}

      <div className="tile-info">
        <span className="tile-name">
          {isLocal && '(你) '}{displayName}
        </span>
        {isMuted && (
          <svg className="mic-off" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12A4.5 4.5 0 1 1 8 12a4.5 4.5 0 0 1 8.5 0zM3 9.5V12h3l4 4V5.5L6.5 9.5H3z"/>
            <line x1="2" y1="2" x2="22" y2="22" stroke="var(--danger)" strokeWidth="2"/>
          </svg>
        )}
      </div>
    </div>
  )
}

function ParticipantVideoTrack({ trackRef }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && trackRef?.track) {
      trackRef.track.attach(ref.current)
      return () => trackRef.track.detach(ref.current)
    }
  }, [trackRef])

  return <video ref={ref} autoPlay playsInline muted={false} className="video-el" />
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
