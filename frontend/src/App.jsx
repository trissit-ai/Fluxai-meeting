import { useState, useCallback, Component } from 'react'
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react'
import '@livekit/components-styles'
import { API_BASE, LIVEKIT_CONFIG, TARGET_LANG, TARGET_LANG_NAME } from './config'
import JoinForm from './components/JoinForm'
import MeetingRoom from './components/MeetingRoom'
import './App.css'

// 顶层错误捕获 —— 任何 React 渲染错误都会显示在这里，不再神秘黑屏
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('[App] Crash caught by ErrorBoundary:', error, info)
    this.setState({ info })
  }
  render() {
    if (this.state.error) {
      const err = this.state.error
      return (
        <div style={{
          padding: '40px',
          color: '#ff5252',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          whiteSpace: 'pre-wrap',
          background: '#1a1a1a',
          minHeight: '100vh',
          fontSize: '14px',
          lineHeight: '1.6',
        }}>
          <h1 style={{ color: '#ff7a1a', marginTop: 0 }}>⚠ App Crashed</h1>
          <p style={{ color: '#b8b8b8' }}>下面是这个错的具体内容。请截图发给开发者。</p>
          <hr style={{ borderColor: '#2a2a2a' }} />
          <h3 style={{ color: '#ff7a1a' }}>Error</h3>
          <pre style={{ margin: 0 }}>{String(err?.stack || err?.message || err)}</pre>
          {this.state.info?.componentStack && (
            <>
              <h3 style={{ color: '#ff7a1a', marginTop: '24px' }}>Component Stack</h3>
              <pre style={{ margin: 0 }}>{this.state.info.componentStack}</pre>
            </>
          )}
          <button
            onClick={() => { this.setState({ error: null, info: null }); window.location.reload() }}
            style={{
              marginTop: '24px',
              padding: '10px 20px',
              background: '#ff7a1a',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            重新加载
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

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
      <ErrorBoundary>
        <LiveKitRoom
          serverUrl={LIVEKIT_CONFIG.url}
          token={roomToken}
          connect={true}
          audio={true}
          video={false}
          onError={(err) => {
            console.error('[LiveKit] Error:', err)
            // 让 LiveKitRoom 自己处理错误显示
          }}
          onDisconnected={handleLeave}
          className="lk-room"
          data-lk-theme="default"
        >
          <ErrorBoundary>
            <MeetingRoom
              roomName={roomName}
              userName={userName}
              targetLang={TARGET_LANG}
              targetLangName={TARGET_LANG_NAME}
              onLeave={handleLeave}
            />
          </ErrorBoundary>
          <RoomAudioRenderer />
        </LiveKitRoom>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}