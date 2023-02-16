import {useContext} from 'react'

import {AiFillFire} from 'react-icons/ai'
import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import NoVideosFound from '../NoVideosFound'
import VideoDetailsCard from '../TrendingVideoCard'
import ThemeContext from '../Context/ThemeContext'

import {
  SavedVideosMainContainer,
  NxtWatchRightSideSection,
  SideBarMainContainer,
  SavedVideosHeadingContainer,
  SavedVideosIconContainer,
  SavedVideoUiContainer,
  SavedVideosHeading,
  SavedVideoDetailsUlElement,
} from './styledComponents'

const SavedVideos = () => {
  const themeContext = useContext(ThemeContext)
  const {isDarkTheme, savedVideos} = themeContext

  const renderSavedVideos = () => {
    if (savedVideos.length > 0) {
      return (
        <SavedVideoUiContainer>
          <SavedVideosHeadingContainer isDarkTheme={isDarkTheme}>
            <SavedVideosIconContainer isDarkTheme={isDarkTheme}>
              <AiFillFire className="trending-icon" />
            </SavedVideosIconContainer>
            <SavedVideosHeading>SavedVidoes</SavedVideosHeading>
          </SavedVideosHeadingContainer>
          <SavedVideoDetailsUlElement>
            {savedVideos.map(trendingVideo => (
              <VideoDetailsCard trendingVideo={trendingVideo} />
            ))}
          </SavedVideoDetailsUlElement>
        </SavedVideoUiContainer>
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

  return (
    <SavedVideosMainContainer
      data-test-id="savedVideos"
      isDarkTheme={isDarkTheme}
    >
      <SideBarMainContainer isDarkTheme={isDarkTheme}>
        <SideBar />
      </SideBarMainContainer>
      <NxtWatchRightSideSection isDarkTheme={isDarkTheme}>
        {renderSavedVideos()}
      </NxtWatchRightSideSection>
    </SavedVideosMainContainer>
  )
}

export default withHeader(SavedVideos)
