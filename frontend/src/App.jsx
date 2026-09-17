import { useState, useCallback } from 'react'
import { LiveKitRoom, RoomAudioRenderer, useLocalParticipant } from '@livekit/components-react'
import '@livekit/components-styles'
import { API_BASE, LIVEKIT_CONFIG, TARGET_LANG, TARGET_LANG_NAME } from './config'
import JoinForm from './components/JoinForm'
import MeetingRoom from './components/MeetingRoom'
import './App.css'

export default function App() {
  const [joined, setJoined] = useState(false)
  const [roomToken, setRoomToken] = useState('')
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState(null)

  // 加入房间
  const handleJoin = useCallback(async ({ roomName: r, userName: u }) => {
    setConnecting(true)
    setError(null)
    setRoomName(r)
    setUserName(u)

    try {
      // 调用后端获取 LiveKit token
      const res = await fetch(`${API_BASE}/api/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: r,
          username: u,
          livekit_url: LIVEKIT_CONFIG.url,
          livekit_api_key: LIVEKIT_CONFIG.apiKey,
          livekit_api_secret: LIVEKIT_CONFIG.apiSecret,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || `请求失败 (${res.status})`)
      }

      const data = await res.json()
      setRoomToken(data.token)
      setJoined(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setConnecting(false)
    }
  }, [])

  // 离开房间
  const handleLeave = useCallback(() => {
    setJoined(false)
    setRoomToken('')
    setRoomName('')
    setUserName('')
  }, [])

  if (joined && roomToken) {
    return (
      <LiveKitRoom
        serverUrl={LIVEKIT_CONFIG.url}
        token={roomToken}
        connect={true}
        audio={true}
        video={true}
        onError={(err) => console.error('[LiveKit] Error:', err)}
        onDisconnected={handleLeave}
        className="lk-room"
      >
        <MeetingRoom
          roomName={roomName}
          userName={userName}
          targetLang={TARGET_LANG}
          targetLangName={TARGET_LANG_NAME}
          onLeave={handleLeave}
        />
        <RoomAudioRenderer />
      </LiveKitRoom>
    )
  }

  return (
    <div className="app">
      <div className="app-bg" />
      <div className="app-container">
        <header className="app-header">
          <div className="logo">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="url(#grad)" />
              <path d="M12 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="18" cy="24" r="2" fill="#fff"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="36" y2="36">
                  <stop offset="0%" stopColor="#ff7a1a"/>
                  <stop offset="100%" stopColor="#ffb347"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text">AI Meeting</span>
          </div>
          <p className="tagline">多语言实时翻译会议</p>
        </header>

        <main className="app-main">
          <JoinForm onJoin={handleJoin} connecting={connecting} error={error} />

          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              </div>
              <div>
                <div className="feature-title">实时翻译</div>
                <div className="feature-desc">任何语言实时翻译为中文</div>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div>
                <div className="feature-title">视频会议</div>
                <div className="feature-desc">实时视频通话，多人参与</div>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div className="feature-title">双语字幕</div>
                <div className="feature-desc">原文字幕 + 中文翻译同步显示</div>
              </div>
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <p>支持 Safari、Chrome、Edge、华为浏览器</p>
          <p>鸿蒙 MateXT / iPhone / Android 均可用</p>
        </footer>
      </div>
    </div>
  )
}
