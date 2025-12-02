'use client'

import { useState } from 'react'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'
import WelcomeHeader from './WelcomeHeader'

interface TranslationResponse {
  translated_text: string
  source_lang: string
  target_lang: string
}

export default function TranslationInterface() {
  const { t } = useLanguage()
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('ne_NP')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    setError('')
    
    try {
      const response = await axios.post<TranslationResponse>('http://localhost:8001/translate', {
        text: inputText,
        src_lang: sourceLang,
        tgt_lang: 'en_XX'
      })
      
      console.log('Translation response:', response.data)
      const translation = response.data.translated_text || 'No translation received'
      setTranslatedText(translation)
      
      // Show success message
      if (translation && translation !== 'No translation received') {
        setTimeout(() => {
          const outputElement = document.querySelector('textarea[readonly]')
          if (outputElement) {
            outputElement.style.backgroundColor = '#e8f5e8'
            setTimeout(() => {
              outputElement.style.backgroundColor = '#f0f8ff'
            }, 1000)
          }
        }, 100)
      }
    } catch (err: any) {
      console.error('Translation error:', err)
      const errorMessage = err.response?.data?.detail || err.message || 'Translation failed. Please try again.'
      setError(errorMessage)
      setTranslatedText('Translation failed - please try again')
    } finally {
      setLoading(false)
    }
  }



  return (
    <>
      <WelcomeHeader />
      <div className="translator-shrine">
      <div className="shrine-header">
        <h1 className="shrine-title">{t('translate.title').toUpperCase()}</h1>
        <div className="decorative-border"></div>
      </div>

      <div className="translation-chambers">
        <div className="source-chamber">
          <div className="chamber-header">
            <h3 className="chamber-label">{t('translate.from')}</h3>
            <div className="language-controls">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="cultural-select"
              >
                <option value="ne_NP">{t('common.nepali')}</option>
                <option value="si_LK">{t('common.sinhala')}</option>
              </select>

            </div>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('translate.placeholder')}
            className="sacred-textarea"
          />
        </div>

        <div className="transformation-bridge">
          <button
            onClick={handleTranslate}
            disabled={loading || !inputText.trim()}
            className="transform-btn"
          >
            {loading ? t('translate.loading').toUpperCase() : t('translate.button').toUpperCase()}
          </button>
        </div>

        <div className="target-chamber">
          <div className="chamber-header">
            <h3 className="chamber-label">{t('translate.to')}</h3>
            <div className="language-controls">
              <select className="cultural-select">
                <option value="english">{t('common.english')}</option>
              </select>

            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
              className="sacred-textarea"
              style={{ 
                backgroundColor: '#f0f8ff', 
                minHeight: '200px',
                border: '3px solid #daa520',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#2F1B14'
              }}
            />
            {translatedText && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                ✓ Translated
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border-2 border-red-300 text-red-700 rounded-xl shadow-md">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
    </>
  )
}