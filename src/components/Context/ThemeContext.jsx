import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  onChangeTheme: () => {},
})

export default ThemeContext
