import {createContext} from 'react'

const ThemeContext = createContext({
  isDarkTheme: false,
  onChangeTheme: () => {},
  savedVideos: [],
  onClickSaveVideo: () => {},
})

export default ThemeContext
