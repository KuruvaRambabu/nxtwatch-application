import {Link} from 'react-router-dom'
import {
  TrendingVideoCardLi,
  TrendingVideoThumbnailImg,
  TrendingVideoDetailsContainer,
  VideoHeading,
  PublishedAndViewsCountContainer,
  ViewsCount,
  PublishedAt,
  ChannelName,
  TrendingThumbnailContainer,
} from './styledComponents'

import './index.css'

const TrendingVideoCard = props => {
  const {trendingVideo} = props
  const {
    thumbnailUrl,
    id,
    channel,
    viewCount,
    publishedAt,
    title,
  } = trendingVideo
  const {name} = channel
  console.log(trendingVideo)
  return (
    <Link to={`/videos/${id}`} className="trending-videos-link">
      <TrendingVideoCardLi>
        <TrendingThumbnailContainer>
          <TrendingVideoThumbnailImg src={thumbnailUrl} alt="thumbnail" />
        </TrendingThumbnailContainer>
        <TrendingVideoDetailsContainer>
          <VideoHeading>{title}</VideoHeading>
          <ChannelName>{name}</ChannelName>
          <PublishedAndViewsCountContainer>
            <ViewsCount>{viewCount} views</ViewsCount>
            <PublishedAt>{publishedAt}</PublishedAt>
          </PublishedAndViewsCountContainer>
        </TrendingVideoDetailsContainer>
      </TrendingVideoCardLi>
    </Link>
  )
}

export default TrendingVideoCard