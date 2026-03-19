import React, { useEffect, useState } from 'react'
import { ThemeContext } from '../types/theme'
import type { Theme } from '../types/theme'

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check for saved theme in localStorage, default to user's system preference
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
    
    // Save to localStorage
    localStorage.setItem('theme', theme)
    
    // Update CSS custom properties for immediate effect
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '17 24 39') // slate-900
      root.style.setProperty('--bg-secondary', '30 41 59') // slate-800
      root.style.setProperty('--bg-tertiary', '51 65 85') // slate-700
      root.style.setProperty('--text-primary', '248 250 252') // slate-50
      root.style.setProperty('--text-secondary', '203 213 225') // slate-300
      root.style.setProperty('--text-muted', '148 163 184') // slate-400
      root.style.setProperty('--border-color', '71 85 105') // slate-600
      root.style.setProperty('--accent-primary', '59 130 246') // blue-500
      root.style.setProperty('--accent-secondary', '147 51 234') // purple-600
      root.style.setProperty('--success-color', '34 197 94') // green-500
      root.style.setProperty('--warning-color', '245 158 11') // amber-500
      root.style.setProperty('--error-color', '239 68 68') // red-500
      root.style.setProperty('--room-bg', '71 85 105') // slate-600
      root.style.setProperty('--sidebar-bg', '30 41 59') // slate-800
      root.style.setProperty('--header-bg', '30 41 59') // slate-800
    } else {
      root.style.setProperty('--bg-primary', '255 255 255') // white
      root.style.setProperty('--bg-secondary', '248 250 252') // slate-50
      root.style.setProperty('--bg-tertiary', '241 245 249') // slate-100
      root.style.setProperty('--text-primary', '15 23 42') // slate-900
      root.style.setProperty('--text-secondary', '51 65 85') // slate-700
      root.style.setProperty('--text-muted', '100 116 139') // slate-500
      root.style.setProperty('--border-color', '203 213 225') // slate-300
      root.style.setProperty('--accent-primary', '59 130 246') // blue-500
      root.style.setProperty('--accent-secondary', '147 51 234') // purple-600
      root.style.setProperty('--success-color', '34 197 94') // green-500
      root.style.setProperty('--warning-color', '245 158 11') // amber-500
      root.style.setProperty('--error-color', '239 68 68') // red-500
      root.style.setProperty('--room-bg', '181 160 139') // brown-ish
      root.style.setProperty('--sidebar-bg', '255 255 255') // white
      root.style.setProperty('--header-bg', '255 255 255') // white
    }
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev: Theme) => prev === 'light' ? 'dark' : 'light')
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const value = {
    theme,
    toggleTheme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}