import {Link} from 'react-router-dom'
import {formatDistanceToNowStrict} from 'date-fns'

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

const VideoCard = props => {
  const {video} = props
  const {id, thumbnailUrl, title, viewCount, publishedAt, channel} = video
  const {name, profileImageUrl} = channel
  const formattedDistance = formatDistanceToNowStrict(new Date(publishedAt))

  return (
    <Link to={`/videos/${id}`} className="videos-link">
      <VideoCardLi>
        <VideoThumbnailImg src={thumbnailUrl} alt="video thumbnail" />
        <VideoContentContainer>
          <VideoChannelLogo src={profileImageUrl} alt="channel logo" />
          <VideoDetailsContainer>
            <VideoHeading>{title}</VideoHeading>
            <VideoChannel>{name}</VideoChannel>
            <VideoViewsAndPublishedContainer>
              <VideoViews>{viewCount} Views</VideoViews>
              <PublishedOn>
                <SpanEl>.</SpanEl>
                {formattedDistance} ago
              </PublishedOn>
            </VideoViewsAndPublishedContainer>
          </VideoDetailsContainer>
        </VideoContentContainer>
      </VideoCardLi>
    </Link>
  )
}

export default VideoCard
