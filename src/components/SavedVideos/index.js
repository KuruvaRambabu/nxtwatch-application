import {Component} from 'react'
import {AiFillFire} from 'react-icons/ai'

import {
  SavedVideosMainContainer,
  NxtWatchRightSideSection,
  SideBarMainContainer,
  SavedVideosHeadingContainer,
  SavedVideosIconContainer,
  SavedVideoUiContainer,
  SavedVideosHeading,
} from './styledComponents'

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import NoVideosFound from '../NoVideosFound'
import {TrendingVideosUlElement} from '../Trending/styledComponents'
import TrendingVideoCard from '../TrendingVideoCard'
import ThemeContext from '../Context/ThemeContext'

class SavedVideos extends Component {
  renderSavedVideos = savedVideos => {
    if (savedVideos.length > 0) {
      return (
        <ThemeContext.Consumer>
          {value => {
            const {isDarkTheme} = value

            return (
              <SavedVideoUiContainer>
                <SavedVideosHeadingContainer isDarkTheme={isDarkTheme}>
                  <SavedVideosIconContainer isDarkTheme={isDarkTheme}>
                    <AiFillFire className="trending-icon" />
                  </SavedVideosIconContainer>
                  <SavedVideosHeading>SavedVidoes</SavedVideosHeading>
                </SavedVideosHeadingContainer>
                <TrendingVideosUlElement>
                  {savedVideos.map(trendingVideo => (
                    <TrendingVideoCard trendingVideo={trendingVideo} />
                  ))}
                </TrendingVideosUlElement>
              </SavedVideoUiContainer>
            )
          }}
        </ThemeContext.Consumer>
      )
    }
    return (
      <NoVideosFound
        imageLink="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        heading="No Saved videos Found"
        description="You can save your videos while watching them"
      />
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {savedVideos, isDarkTheme} = value
          console.log('saved videos component', savedVideos)
          return (
            <SavedVideosMainContainer
              data-test-id="savedVideos"
              isDarkTheme={isDarkTheme}
            >
              <SideBarMainContainer isDarkTheme={isDarkTheme}>
                <SideBar />
              </SideBarMainContainer>
              <NxtWatchRightSideSection isDarkTheme={isDarkTheme}>
                {this.renderSavedVideos(savedVideos)}
              </NxtWatchRightSideSection>
            </SavedVideosMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withHeader(SavedVideos)
