import {Link} from 'react-router-dom'

import './index.css'

import {
  VideoCardLi,
  VideoThumbnailImg,
  VideoContentContainer,
  VideoChannelLogo,
  VideoDetailsContainer,
  VideoHeading,
  VideoChannel,
  VideoViewsAndPublishedContainer,
  PublishedOn,
  VideoViews,
  SpanEl,
} from './styledComponents'
import SavedVideosContext from '../Context/SavedVideosContext'

const VideoCard = props => {
  const {video} = props
  const {id, thumbnailUrl, title, viewCount, publishedAt, channel} = video
  const {name, profileImageUrl} = channel
  return (
    <Link to={`/videos/${id}`} className="videos-link">
      <VideoCardLi>
        <VideoThumbnailImg src={thumbnailUrl} alt="thumbnail" />
        <VideoContentContainer>
          <VideoChannelLogo src={profileImageUrl} alt="logo" />
          <VideoDetailsContainer>
            <VideoHeading>{title}</VideoHeading>
            <VideoChannel>{name}</VideoChannel>
            <VideoViewsAndPublishedContainer>
              <VideoViews>{viewCount} Views</VideoViews>
              <PublishedOn>
                <SpanEl>.</SpanEl>
                {publishedAt}
              </PublishedOn>
            </VideoViewsAndPublishedContainer>
          </VideoDetailsContainer>
        </VideoContentContainer>
      </VideoCardLi>
    </Link>
  )
}

export default VideoCard
