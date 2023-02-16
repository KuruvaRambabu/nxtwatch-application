import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {AiFillFire} from 'react-icons/ai'

import apiConstants from '../../constants/apiConstants'

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import NoVideosFound from '../NoVideosFound'
import ThemeContext from '../Context/ThemeContext'
import VideoDetailsCard from '../TrendingVideoCard'

import './index.css'

import {
  TrendingMainContainer,
  TrendingRightSideSection,
  SideBarMainContainer,
  TrendingVideoContaianer,
  TrendingVideosHeadingContainer,
  TrendingVideosIcon,
  TrendingVideoHeading,
  TrendingVideosUlElement,
  Container,
} from './styledComponents'

const Trending = () => {
  const [trendingVideosResponse, updateTrendingVideosResponse] = useState({
    apiStatus: apiConstants.initial,
    trendingVideosList: [],
  })
  const themeContext = useContext(ThemeContext)
  const {isDarkTheme} = themeContext

  const onVideosAPIFailure = () => {
    updateTrendingVideosResponse(prevState => ({
      ...prevState,
      apiStatus: apiConstants.failure,
    }))
  }

  const onVideosAPISuccess = data => {
    const {videos} = data
    console.log(videos)
    const formattedVideosData = videos.map(video => ({
      id: video.id,
      title: video.title,
      thumbnailUrl: video.thumbnail_url,
      channel: {
        name: video.channel.name,
        profileImageUrl: video.channel.profile_image_url,
      },
      viewCount: video.view_count,
      publishedAt: video.published_at,
    }))
    console.log(formattedVideosData)
    updateTrendingVideosResponse({
      apiStatus: apiConstants.success,
      trendingVideosList: formattedVideosData,
    })
  }

  const getTrendingVideoAPI = async () => {
    updateTrendingVideosResponse(prevState => ({
      ...prevState,
      apiStatus: apiConstants.inProgress,
    }))

    const url = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      onVideosAPISuccess(data)
    } else {
      onVideosAPIFailure()
    }
  }

  useEffect(() => {
    getTrendingVideoAPI()
  }, [])

  const renderTrendingVideosAPISuccess = () => {
    const {trendingVideosList} = trendingVideosResponse
    if (trendingVideosList.length > 0) {
      return (
        <TrendingVideoContaianer>
          <TrendingVideosHeadingContainer isDarkTheme={isDarkTheme}>
            <TrendingVideosIcon isDarkTheme={isDarkTheme}>
              <AiFillFire className="trending-icon" />
            </TrendingVideosIcon>
            <TrendingVideoHeading>Trending</TrendingVideoHeading>
          </TrendingVideosHeadingContainer>
          <TrendingVideosUlElement isDarkTheme={isDarkTheme}>
            {trendingVideosList.map(trendingVideo => (
              <VideoDetailsCard
                key={trendingVideo.id}
                trendingVideo={trendingVideo}
              />
            ))}
          </TrendingVideosUlElement>
        </TrendingVideoContaianer>
      )
    }
    return <NoVideosFound />
  }

  const renderTrendingVideoAPILoadingView = () => <LoadingView />

  const renderTrendingVideoAPIFailureView = () => (
    <FailureView
      failureImg="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      getVideosAPI={getTrendingVideoAPI}
    />
  )

  const renderTrendingVideos = () => {
    const {apiStatus} = trendingVideosResponse

    switch (apiStatus) {
      case apiConstants.inProgress:
        return renderTrendingVideoAPILoadingView()
      case apiConstants.success:
        return renderTrendingVideosAPISuccess()
      case apiConstants.failure:
        return renderTrendingVideoAPIFailureView()

      default:
        return ''
    }
  }
  return (
    <TrendingMainContainer data-testid="trending" isDarkTheme={isDarkTheme}>
      <SideBarMainContainer isDarkTheme={isDarkTheme}>
        <SideBar />
      </SideBarMainContainer>
      <TrendingRightSideSection>
        <Container isDarkTheme={isDarkTheme}>
          {renderTrendingVideos()}
        </Container>
      </TrendingRightSideSection>
    </TrendingMainContainer>
  )
}

export default withHeader(Trending)
