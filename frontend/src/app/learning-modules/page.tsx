'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../cultural-styles.css'

export default function LearningPage() {
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('light')
  const [uiTheme, setUiTheme] = useState('nepali-theme')
  const [isFloatingMode, setIsFloatingMode] = useState(false)
  const pathname = usePathname()

  const translations = {
    en: { title: 'संस्कृति', subtitle: 'Multilingual Cultural Translation Platform', offlineTranslator: 'Text Translator', voiceAssistant: 'Voice Assistant', learningModules: 'Learning Modules', literatureCentre: 'Literature Centre', chatbot: 'Offline Chatbot', floatingMode: 'Enable Floating Mode', alphabets: 'Alphabets & Scripts', words: 'Vocabulary Builder', grammar: 'Grammar Rules', poems: 'Stories & Poems' },
    ne: { title: 'संस्कृति', subtitle: 'बहुभाषिक अनुवाद र सांस्कृतिक सेतु', offlineTranslator: 'अफलाइन अनुवादक', voiceAssistant: 'आवाज सहायक', learningModules: 'सिकाइ मोड्युलहरू', literatureCentre: 'साहित्य केन्द्र', chatbot: 'अफलाइन च्याटबोट', floatingMode: 'फ्लोटिङ मोड सक्षम गर्नुहोस्', alphabets: 'वर्णमाला र लिपि', words: 'शब्दकोश निर्माता', grammar: 'व्याकरण नियम', poems: 'कथा र कविता' },
    si: { title: 'සංස්කෘතිය', subtitle: 'බහුභාෂා පරිවර්තන සහ සංස්කෘතික පාලම', offlineTranslator: 'නොබැඳි පරිවර්තකය', voiceAssistant: 'හඬ සහායක', learningModules: 'ඉගෙනුම් මොඩියුල', literatureCentre: 'සාහිත්ය මධ්යස්ථානය', chatbot: 'නොබැඳි චැට්බොට්', floatingMode: 'පාවෙන ප්රකාරය සක්රිය කරන්න', alphabets: 'අකුරු සහ ලිපි', words: 'වචන සම්පත් සාදන්නා', grammar: 'ව්යාකරණ නීති', poems: 'කතා සහ කවි' }
  }

  const t = translations[language as keyof typeof translations]

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
              <option value="ne">नेपाली</option>
              <option value="si">සිංහල</option>
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
          <div className="knowledge-temple">
            <div className="temple-header">
              <h2 className="temple-title">{t.learningModules}</h2>
              <div className="offline-badge">
                <span>⚡</span> Offline Learning • Progress Tracking
              </div>
              <div className="temple-ornament">🏛️</div>
            </div>
            <div className="learning-mandala">
              <div className="learning-petal">
                <div className="petal-icon">⏰</div>
                <h3>{t.alphabets}</h3>
                <p>Learn Devanagari & Sinhala scripts offline</p>
              </div>
              <div className="learning-petal">
                <div className="petal-icon">📊</div>
                <h3>{t.words}</h3>
                <p>Build vocabulary with offline quizzes</p>
              </div>
              <div className="learning-petal">
                <div className="petal-icon">⚖️</div>
                <h3>{t.grammar}</h3>
                <p>Master grammar rules and sentence formation</p>
              </div>
              <div className="learning-petal">
                <div className="petal-icon">🌸</div>
                <h3>{t.poems}</h3>
                <p>Cultural stories and poems with audio</p>
              </div>
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