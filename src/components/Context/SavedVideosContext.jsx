import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideos: [],
  onClickSaveVideo: () => {},
})

export default SavedVideosContext
