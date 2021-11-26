import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react'
import PropTypes from 'prop-types'

function usePrevious(theme) {
  const ref = useRef()
  useEffect(() => {
    ref.current = theme
  })
  return ref.current
}

function useStorageTheme(key) {
  const userPreference =
    !!window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useState(
    localStorage.getItem(key) || userPreference,
  )

  useEffect(() => {
    localStorage.setItem(key, theme)
  }, [theme, key])

  return [theme, setTheme]
}

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useStorageTheme('theme')

  const oldTheme = usePrevious(theme)
  useLayoutEffect(() => {
    document.documentElement.classList.remove(`theme-${oldTheme}`)
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme, oldTheme])

  function toggleTheme() {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }

  const value = useMemo(() => {
    return {
      theme,
      toggleTheme,
    }
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
