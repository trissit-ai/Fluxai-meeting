import { useState } from 'react'
import './JoinForm.css'

export default function JoinForm({ onJoin, connecting, error }) {
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!roomName.trim() || !userName.trim()) return
    onJoin({ roomName: roomName.trim(), userName: userName.trim() })
  }

  const generateRoomId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''
    for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)]
    setRoomName(id)
  }

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <h2 className="join-title">加入会议</h2>

      {error && (
        <div className="join-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}

      <div className="form-field">
        <label className="form-label">你的名字</label>
        <input
          className="form-input"
          type="text"
          placeholder="例如：张三"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          maxLength={30}
          required
          autoFocus
        />
      </div>

      <div className="form-field">
        <label className="form-label">
          房间号
          <button type="button" className="generate-btn" onClick={generateRoomId}>
            随机生成
          </button>
        </label>
        <input
          className="form-input"
          type="text"
          placeholder="输入房间号，或点击随机生成"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          maxLength={32}
          required
        />
        <p className="form-hint">三人输入相同房间号即可加入同一场会议</p>
      </div>

      <button className="join-btn" type="submit" disabled={connecting || !roomName || !userName}>
        {connecting ? (
          <>
            <span className="spinner" />
            连接中...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            进入会议
          </>
        )}
      </button>

      <div className="setup-note">
        <p>首次使用需要配置 API Key（只需配置一次）</p>
        <p>联系管理员获取，或查看 .env.example 文件</p>
      </div>
    </form>
  )
}
