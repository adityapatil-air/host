'use client'

import { useState } from 'react'
import axios from 'axios'

interface TranslationResponse {
  translated_text: string
  source_lang: string
  target_lang: string
}

export default function TranslationInterface() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('nepali')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    setError('')
    
    try {
      const response = await axios.post<TranslationResponse>('http://localhost:8000/translate', {
        text: inputText,
        source_lang: sourceLang,
        target_lang: 'english'
      })
      
      setTranslatedText(response.data.translated_text)
    } catch (err: any) {
      console.error('Translation error:', err)
      const errorMessage = err.response?.data?.detail || err.message || 'Translation failed. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="translator-shrine">
      <div className="shrine-header">
        <h1 className="shrine-title">TEXT TRANSLATOR</h1>
        <div className="decorative-border"></div>
      </div>

      <div className="translation-chambers">
        <div className="source-chamber">
          <div className="chamber-header">
            <h3 className="chamber-label">From</h3>
            <div className="language-controls">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="cultural-select"
              >
                <option value="nepali">नेपाली</option>
                <option value="sinhala">සිංහල</option>
              </select>

            </div>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your text here for translation..."
            className="sacred-textarea"
          />
        </div>

        <div className="transformation-bridge">
          <button
            onClick={handleTranslate}
            disabled={loading || !inputText.trim()}
            className="transform-btn"
          >
            {loading ? 'TRANSLATING...' : 'TRANSLATE'}
          </button>
        </div>

        <div className="target-chamber">
          <div className="chamber-header">
            <h3 className="chamber-label">To</h3>
            <div className="language-controls">
              <select className="cultural-select">
                <option value="english">English</option>
              </select>

            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
              className="sacred-textarea"
            />
            

          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border-2 border-red-300 text-red-700 rounded-xl shadow-md">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  )
}