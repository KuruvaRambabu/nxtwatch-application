import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import {GiGamepad} from 'react-icons/gi'

import apiConstants from '../../constants/apiConstants'

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import GamingVideoCard from '../GamingVideoCard'
import ThemeContext from '../Context/ThemeContext'

import {
  GamingMainContainer,
  NxtWatchRightSideSection,
  SideBarMainContainer,
  GamingVideosUiMainContainer,
  GamingVideosHeadingContainer,
  GamingVideoIconContainer,
  GamingVideoHeading,
  GamingVideoDisplayContainer,
} from './styledComponents'

const Gaming = () => {
  const [gamingVideoApiResponse, updateGamingVideosAPIResponse] = useState({
    gamingVideosList: [],
    apiStatus: apiConstants.initial,
  })
  const themeContext = useContext(ThemeContext)
  const {isDarkTheme} = themeContext

  const onGamingAPISuccess = data => {
    const {videos} = data
    const formattedVideosData = videos.map(video => ({
      id: video.id,
      title: video.title,
      thumbnailUrl: video.thumbnail_url,
      viewCount: video.view_count,
    }))
    updateGamingVideosAPIResponse({
      apiStatus: apiConstants.success,
      gamingVideosList: formattedVideosData,
    })
  }

  const onGamingAPIFailure = () => {
    updateGamingVideosAPIResponse(prevState => ({
      ...prevState,
      apiStatus: apiConstants.failure,
    }))
  }

  const getGamingVidoesAPI = async () => {
    updateGamingVideosAPIResponse(prevState => ({
      ...prevState,
      apiStatus: apiConstants.inProgress,
    }))
    const url = 'https://apis.ccbp.in/videos/gaming'
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
      onGamingAPISuccess(data)
    } else {
      onGamingAPIFailure()
    }
  }

  useEffect(() => {
    getGamingVidoesAPI()
  }, [])

  const renderGamingVideosAPISuccess = () => {
    const {gamingVideosList} = gamingVideoApiResponse

    return (
      <GamingVideosUiMainContainer isDarkTheme={isDarkTheme}>
        <GamingVideosHeadingContainer isDarkTheme={isDarkTheme}>
          <GamingVideoIconContainer isDarkTheme={isDarkTheme}>
            <GiGamepad className="trending-icon" />
          </GamingVideoIconContainer>
          <GamingVideoHeading>Gaming</GamingVideoHeading>
        </GamingVideosHeadingContainer>
        <GamingVideoDisplayContainer>
          {gamingVideosList.map(video => (
            <GamingVideoCard gameVideo={video} key={video.id} />
          ))}
        </GamingVideoDisplayContainer>
      </GamingVideosUiMainContainer>
    )
  }

  const renderGamingVideoFailureView = () => (
    <FailureView
      failureImg="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      getVideosAPI={getGamingVidoesAPI}
    />
  )

  const renderGamingLoadingView = () => <LoadingView />

  const renderGamingVideosUI = () => {
    const {apiStatus} = gamingVideoApiResponse

    switch (apiStatus) {
      case apiConstants.inProgress:
        return renderGamingLoadingView()
      case apiConstants.success:
        return renderGamingVideosAPISuccess()
      case apiConstants.failure:
        return renderGamingVideoFailureView()
      default:
        return ''
    }
  }

  return (
    <GamingMainContainer data-test-id="gaming" isDarkTheme={isDarkTheme}>
      <SideBarMainContainer isDarkTheme={isDarkTheme}>
        <SideBar />
      </SideBarMainContainer>
      <NxtWatchRightSideSection>
        {renderGamingVideosUI()}
      </NxtWatchRightSideSection>
    </GamingMainContainer>
  )
}

export default withHeader(Gaming)
