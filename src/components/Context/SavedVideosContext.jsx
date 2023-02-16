import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideos: [],
  onClickSaveVideo: () => {},
  isDarkTheme: false,
  onChangeTheme: () => {},
})

export default SavedVideosContext
