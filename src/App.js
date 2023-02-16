import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import ThemeContext from './components/Context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import WatchVideo from './components/WatchVideo'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
  }

  onChangeTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  onClickSaveVideo = video => {
    const {id} = video
    const {savedVideos} = this.state
    const savedVideosCopy = [...savedVideos]
    const index = savedVideos.findIndex(eachVideo => eachVideo.id === id)
    console.log(index)
    if (index === -1) {
      savedVideosCopy.push(video)
    } else {
      savedVideosCopy.splice(index, 1)
    }
    this.setState({savedVideos: [...savedVideosCopy]})
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state
    console.log('hiiiii', savedVideos)
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          onChangeTheme: this.onChangeTheme,
          onClickSaveVideo: this.onClickSaveVideo,
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
}
export default App
