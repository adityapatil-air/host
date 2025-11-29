'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../cultural-styles.css'

export default function LiteratureCentre() {
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('light')
  const [uiTheme, setUiTheme] = useState('nepali-theme')
  const pathname = usePathname()

  const translations = {
    en: { title: 'संस्कृति', subtitle: 'Multilingual Cultural Translation Platform', offlineTranslator: 'Text Translator', learningModules: 'Learning Modules', literatureCentre: 'Literature Centre' }
  }

  const t = translations[language as keyof typeof translations]

  const manuscripts = [
    { title: 'रामायण', subtitle: 'Sanskrit Epic', type: 'Online Translation', icon: '👤' },
    { title: 'महाभारत', subtitle: 'Ancient Wisdom', type: 'Voice Narration', icon: '👤' },
    { title: 'गीता', subtitle: 'Spiritual Guide', type: 'Parallel Text', icon: '👤' },
    { title: 'पुत्र मदन', subtitle: 'Nepali Classic', type: 'Audio Book', icon: '👤' },
    { title: 'කුමරිහිමි', subtitle: 'Sinhala Legend', type: 'Interactive Reading', icon: '👤' },
    { title: 'සිරි සංගරාව', subtitle: 'Sinhala Poetry', type: 'Pronunciation Guide', icon: '👤' }
  ]

  return (
    <div className={`cultural-app ${theme} ${uiTheme}`} suppressHydrationWarning>
      <header className="cultural-header">
        <div className="header-ornament"></div>
        <div className="header-content">
          <div className="header-left">
            <h1 className="main-title">{t.title}</h1>
            <p className="subtitle">{t.subtitle}</p>
          </div>
          <div className="header-right">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="cultural-select">
              <option value="en">English</option>
            </select>
            <button className="theme-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="culture-btn" onClick={() => setUiTheme(uiTheme === 'nepali-theme' ? 'srilankan-theme' : 'nepali-theme')}>
              {uiTheme === 'nepali-theme' ? '🏔️' : '🌴'}
            </button>
          </div>
        </div>
        <div className="header-ornament bottom"></div>
      </header>

      <aside className="cultural-sidebar">
        <nav className="sidebar-nav">
          <Link href="/text-translator" className={`sidebar-item ${pathname === '/text-translator' ? 'active' : ''}`}>
            <span className="sidebar-icon">🔄</span>
            <span className="sidebar-text">{t.offlineTranslator}</span>
          </Link>
          <Link href="/image-upload" className={`sidebar-item ${pathname === '/image-upload' ? 'active' : ''}`}>
            <span className="sidebar-icon">📷</span>
            <span className="sidebar-text">Image/PDF Upload</span>
          </Link>
          <Link href="/learning-modules" className={`sidebar-item ${pathname === '/learning-modules' ? 'active' : ''}`}>
            <span className="sidebar-icon">📚</span>
            <span className="sidebar-text">{t.learningModules}</span>
          </Link>
          <Link href="/literature-centre" className={`sidebar-item ${pathname === '/literature-centre' ? 'active' : ''}`}>
            <span className="sidebar-icon">📜</span>
            <span className="sidebar-text">{t.literatureCentre}</span>
          </Link>
          <Link href="/download-extension" className={`sidebar-item ${pathname === '/download-extension' ? 'active' : ''}`}>
            <span className="sidebar-icon">⬇️</span>
            <span className="sidebar-text">Download Extension</span>
          </Link>
        </nav>
      </aside>

      <main className="cultural-main with-sidebar">
        <div className="content-container">
          <div className="heritage-library">
            <div className="library-header">
              <h2 className="library-title">LITERATURE CENTRE</h2>
              <div className="offline-badge">
                <span>📚</span> Offline E-books • Inline Translation
              </div>
              <div className="library-ornament">📜</div>
            </div>
            <div className="manuscript-collection">
              {manuscripts.map((manuscript, index) => (
                <div key={index} className="manuscript-scroll">
                  <div className="scroll-decoration"></div>
                  <div className="manuscript-content">
                    <h3 className="manuscript-title">{manuscript.title}</h3>
                    <p className="manuscript-culture">{manuscript.subtitle}</p>
                    <div className="manuscript-features">{manuscript.type}</div>
                  </div>
                  <div className="scroll-seal">{manuscript.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="cultural-footer">
        <div className="footer-pattern"></div>
        <div className="footer-content">
          <p>🕉️ संस्कृति - Multilingual Translation & Cultural Bridge 🕉️</p>
          <p>Privacy-Safe • No Internet Required • Cultural Heritage Preserved</p>
        </div>
        <div className="footer-pattern bottom"></div>
      </footer>
    </div>
  )
}