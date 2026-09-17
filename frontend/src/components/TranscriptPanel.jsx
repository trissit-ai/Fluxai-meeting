import { useRef, useEffect } from 'react'
import './TranscriptPanel.css'

export default function TranscriptPanel({ transcripts, translations }) {
  const transRef = useRef(null)
  const transLiRef = useRef(null)

  // 自动滚动到最新
  useEffect(() => {
    if (transLiRef.current) {
      transLiRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [translations])

  return (
    <div className="transcript-panel">
      <div className="panel-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        实时翻译
        <span className="lang-tag">→ 中文</span>
      </div>

      <div className="transcript-list" ref={transRef}>
        {translations.length === 0 && transcripts.length === 0 && (
          <div className="empty-state">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>说话后会自动翻译</p>
            <p className="sub">请允许麦克风权限</p>
          </div>
        )}

        {translations.map((item) => (
          <div key={item.id} className="transcript-item translated">
            <div className="transcript-time">
              {formatTime(item.time)}
            </div>
            <div className="transcript-content">
              <div className="transcript-original">
                <span className="lang-label">原</span>
                {item.original}
              </div>
              <div className="transcript-translated">
                <span className="lang-label zh">中</span>
                {item.translated}
              </div>
            </div>
          </div>
        ))}

        {/* 仅有原文（翻译还在处理中） */}
        {transcripts
          .filter(t => !translations.find(tr => tr.original === t.text))
          .slice(-3)
          .map((item) => (
            <div key={`pending-${item.id}`} className="transcript-item pending">
              <div className="transcript-time">{formatTime(item.time)}</div>
              <div className="transcript-content">
                <div className="transcript-original">
                  <span className="lang-label">原</span>
                  {item.text}
                  <span className="translating-dot">...</span>
                </div>
              </div>
            </div>
          ))
        }

        <div ref={transLiRef} />
      </div>
    </div>
  )
}

function formatTime(date) {
  if (!date) return ''
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}
