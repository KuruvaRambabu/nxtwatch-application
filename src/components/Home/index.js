import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import apiConstants from '../../constants/apiConstants'

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import NxtWatchPremium from '../NxtWatchPremium'
import VideoCard from '../VideoCard'
import ThemeContext from '../Context/ThemeContext'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'
import NoVideosFound from '../NoVideosFound'

import {
  HomeMainContainer,
  NxtWatchRightSideSection,
  SideBarMainContainer,
  NxtWatchVideosMainContainer,
  SearchContainer,
  SearchInputAndIconContainer,
  InputSearchField,
  SearchIconBtn,
  VideosContainer,
} from './styledComponents'
import './index.css'

const Home = () => {
  const [showPremiumBuyBanner, updatePremiumBannerViewStatus] = useState(true)
  const [searchValue, setSearchvalue] = useState('')
  const [videosApiResponse, updateVideosApiResponse] = useState({
    videosList: [],
    apiStatus: apiConstants.initial,
  })
  const themeContext = useContext(ThemeContext)
  const {isDarkTheme} = themeContext

  const onVideosAPISuccess = data => {
    const {videos} = data
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
    updateVideosApiResponse({
      apiStatus: apiConstants.success,
      videosList: formattedVideosData,
    })
  }

  const onVideosAPIFailure = () => {
    updateVideosApiResponse(prevResponse => ({
      ...prevResponse,
      apiStatus: apiConstants.failure,
    }))
  }

  const getVideosAPI = async () => {
    updateVideosApiResponse(prevResponse => ({
      ...prevResponse,
      apiStatus: apiConstants.inProgress,
    }))

    const url = `https://apis.ccbp.in/videos/all?search=${searchValue}`
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
    getVideosAPI()
  }, [searchValue])

  const OnClosePremiumBuyBanner = () => {
    updatePremiumBannerViewStatus(false)
  }

  const onChangeSearchInput = event => {
    setSearchvalue(event.target.value)
  }

  const renderVideosAPILoadingView = () => <LoadingView />

  const renderVideosAPISuccess = () => {
    const {videosList} = videosApiResponse
    if (videosList.length > 0) {
      return (
        <VideosContainer>
          {videosList.map(video => (
            <VideoCard video={video} key={video.id} />
          ))}
        </VideosContainer>
      )
    }
    return <NoVideosFound getVideosAPI={getVideosAPI} />
  }

  const renderVideosAPIFailureView = () => (
    <FailureView
      failureImg="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="failure view"
      getVideosAPI={getVideosAPI}
    />
  )

  const renderVideosUI = () => {
    const {apiStatus} = videosApiResponse

    switch (apiStatus) {
      case apiConstants.inProgress:
        return renderVideosAPILoadingView()
      case apiConstants.success:
        return renderVideosAPISuccess()
      case apiConstants.failure:
        return renderVideosAPIFailureView()
      default:
        return ''
    }
  }

  const renderSearchVideoField = () => (
    <SearchContainer>
      <SearchInputAndIconContainer>
        <InputSearchField
          type="search"
          placeholder="Search"
          value={searchValue}
          onChange={onChangeSearchInput}
        />
        <SearchIconBtn
          className="search-icon-btn"
          type="button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </SearchIconBtn>
      </SearchInputAndIconContainer>
    </SearchContainer>
  )

  return (
    <HomeMainContainer data-testid="home" isDarkTheme={isDarkTheme}>
      <SideBarMainContainer isDarkTheme={isDarkTheme}>
        <SideBar />
      </SideBarMainContainer>
      <NxtWatchRightSideSection>
        {showPremiumBuyBanner && (
          <NxtWatchPremium OnClosePremiumBuyBanner={OnClosePremiumBuyBanner} />
        )}
        <NxtWatchVideosMainContainer isDarkTheme={isDarkTheme}>
          {renderSearchVideoField()}
          {renderVideosUI()}
        </NxtWatchVideosMainContainer>
      </NxtWatchRightSideSection>
    </HomeMainContainer>
  )
}

export default withHeader(Home)
