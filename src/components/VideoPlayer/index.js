import ReactPlayer from 'react-player'

import './index.css'
import {
  VideoContainer,
  VideoHeading,
  VideoPlayerContainer,
} from './styledComponents'

const VideoPlayer = props => {
  const {url, title} = props
  return (
    <VideoContainer className="video-container">
      <VideoPlayerContainer className="responsive-container">
        <ReactPlayer
          width="98%"
          height="55vh"
          url={url}
          playing={false}
          controls
        />
      </VideoPlayerContainer>
      <VideoHeading>{title}</VideoHeading>
    </VideoContainer>
  )
}

export default VideoPlayer
