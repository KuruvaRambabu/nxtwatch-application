import ReactPlayer from 'react-player'

import './index.css'
import {VideoContainer, VideoHeading} from './styledComponents'

const VideoPlayer = props => {
  const {url, title} = props
  return (
    <VideoContainer className="video-container">
      <div className="responsive-container">
        <ReactPlayer
          width="98%"
          height="55vh"
          url={url}
          playing={false}
          controls
        />
      </div>
      <VideoHeading>{title}</VideoHeading>
    </VideoContainer>
  )
}

export default VideoPlayer
