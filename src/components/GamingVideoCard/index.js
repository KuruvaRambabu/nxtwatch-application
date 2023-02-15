import {Link} from 'react-router-dom'
import './index.css'

import {
  GameVideoCardLiElement,
  GameVideoThumbnailImg,
  GameVideoTitle,
  GameVideoViews,
} from './styledComponents'

const GamingVideoCard = props => {
  const {gameVideo} = props
  const {thumbnailUrl, title, viewCount, id} = gameVideo
  return (
    <Link to={`/videos/${id}`} className="gaming-videos-link">
      <GameVideoCardLiElement>
        <GameVideoThumbnailImg src={thumbnailUrl} />
        <GameVideoTitle>{title}</GameVideoTitle>
        <GameVideoViews>{viewCount} Watching Worldwide</GameVideoViews>
      </GameVideoCardLiElement>
    </Link>
  )
}

export default GamingVideoCard
