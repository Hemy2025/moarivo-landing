'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from './i18n'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextType>({ lang: 'it', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('it')

  useEffect(() => {
    const stored = localStorage.getItem('moarivo-lang') as Lang | null
    if (stored === 'it' || stored === 'en') {
      setLangState(stored)
    } else {
      const browserLang = navigator.language.toLowerCase()
      setLangState(browserLang.startsWith('en') ? 'en' : 'it')
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('moarivo-lang', l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
