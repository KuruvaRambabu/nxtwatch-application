import {Component} from 'react'

import {
  SavedVideosMainContainer,
  NxtWatchRightSideSection,
  SideBarMainContainer,
} from './styledComponents'

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import SavedVideosContext from '../Context/SavedVideosContext'
import NoVideosFound from '../NoVideosFound'
import {TrendingVideosUlElement} from '../Trending/styledComponents'
import TrendingVideoCard from '../TrendingVideoCard'

class SavedVideos extends Component {
  renderSavedVideos = savedVideos => {
    if (savedVideos.length > 0) {
      return (
        <TrendingVideosUlElement>
          {savedVideos.map(trendingVideo => (
            <TrendingVideoCard trendingVideo={trendingVideo} />
          ))}
        </TrendingVideosUlElement>
      )
    }
    return (
      <NoVideosFound
        imageLink="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
    )
  }

  render() {
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {savedVideos} = value
          console.log('saved videos component', savedVideos)
          return (
            <SavedVideosMainContainer>
              <SideBarMainContainer>
                <SideBar />
              </SideBarMainContainer>
              <NxtWatchRightSideSection>
                {this.renderSavedVideos(savedVideos)}
              </NxtWatchRightSideSection>
            </SavedVideosMainContainer>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default withHeader(SavedVideos)
