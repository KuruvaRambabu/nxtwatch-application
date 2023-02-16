import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import WatchVideo from './components/WatchVideo'
import NotFound from './components/NotFound'
import ThemeContext from './components/Context/ThemeContext'
import Home from './components/Home'

import './App.css'

const App = () => {
  const [savedVideos, updateSavedVideos] = useState([])
  const [isDarkTheme, toggleTheme] = useState(false)

  const onChangeTheme = () => {
    toggleTheme(prevState => !prevState)
  }

  const onClickSaveVideo = video => {
    const {id} = video
    const savedVideosCopy = [...savedVideos]
    const index = savedVideos.findIndex(eachVideo => eachVideo.id === id)
    if (index === -1) {
      savedVideosCopy.push(video)
    } else {
      savedVideosCopy.splice(index, 1)
    }
    updateSavedVideos([...savedVideosCopy])
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        onChangeTheme,
        onClickSaveVideo,
        savedVideos,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute exact path="/gaming" component={Gaming} />
        <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
        <ProtectedRoute exact path="/videos/:id" component={WatchVideo} />
        <Route component={NotFound} />
      </Switch>
    </ThemeContext.Provider>
  )
}

export default App
