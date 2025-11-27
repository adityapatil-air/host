'use client'

import Sidebar from './Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cultural-app">
      <div className="header-ornament"></div>
      {/* Header */}
      <header className="cultural-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="main-title">संस्कृति</h1>
            <p className="subtitle">Multilingual Cultural Translation Platform</p>
          </div>
          <div className="header-right">
            <select className="cultural-select">
              <option>English</option>
            </select>
            <button className="theme-btn">
              <span>🌙</span>
            </button>
            <button className="culture-btn">
              <span>🔔</span>
            </button>
          </div>
        </div>
      </header>

      <div className="cultural-sidebar">
        <div className="sidebar-nav">
          <Sidebar activeTab="" setActiveTab={() => {}} />
        </div>
      </div>
      
      <main className="cultural-main">
        {children}
      </main>


    </div>
  )
}