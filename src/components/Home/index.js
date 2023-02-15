import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import './index.css'
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
  LoaderContainer,
} from './styledComponents'

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import NxtWatchPremium from '../NxtWatchPremium'
import apiConstants from '../../constants/apiConstants'
import VideoCard from '../VideoCard'
import ThemeContext from '../Context/ThemeContext'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'
import NoVideosFound from '../NoVideosFound'

class Home extends Component {
  state = {
    showPremiumBuyBanner: true,
    searchValue: '',
    videosList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getVideosAPI()
  }

  onVideosAPISuccess = data => {
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
    this.setState({
      apiStatus: apiConstants.success,
      videosList: formattedVideosData,
    })
  }

  onVideosAPIFailure = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  getVideosAPI = async () => {
    const {searchValue} = this.state
    this.setState({apiStatus: apiConstants.inProgress})

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
      this.onVideosAPISuccess(data)
    } else {
      this.onVideosAPIFailure()
    }
  }

  OnClosePremiumBuyBanner = () => {
    this.setState({showPremiumBuyBanner: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchValue: event.target.value}, this.getVideosAPI)
  }

  renderVideosAPILoadingView = () => <LoadingView />

  renderVideosAPISuccess = () => {
    const {videosList} = this.state
    if (videosList.length > 0) {
      return (
        <VideosContainer>
          {videosList.map(video => (
            <VideoCard video={video} key={video.id} />
          ))}
        </VideosContainer>
      )
    }
    return <NoVideosFound getVideosAPI={this.getVideosAPI} />
  }

  renderVideosAPIFailureView = () => (
    <FailureView
      failureImg="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="failure view"
      getVideosAPI={this.getVideosAPI}
    />
  )

  renderVideosUI = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderVideosAPILoadingView()
      case apiConstants.success:
        return this.renderVideosAPISuccess()
      case apiConstants.failure:
        return this.renderVideosAPIFailureView()

      default:
        return ''
    }
  }

  renderSearchVideoField = () => {
    const {searchValue} = this.state
    return (
      <SearchContainer>
        <SearchInputAndIconContainer>
          <InputSearchField
            type="search"
            placeholder="Search"
            value={searchValue}
            onChange={this.onChangeSearchInput}
          />
          <SearchIconBtn
            onClick={this.onClickSearchButton}
            className="search-icon-btn"
            type="button"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </SearchIconBtn>
        </SearchInputAndIconContainer>
      </SearchContainer>
    )
  }

  render() {
    const {showPremiumBuyBanner} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <HomeMainContainer isDarkTheme={isDarkTheme}>
              <SideBarMainContainer isDarkTheme={isDarkTheme}>
                <SideBar />
              </SideBarMainContainer>
              <NxtWatchRightSideSection>
                {showPremiumBuyBanner && (
                  <NxtWatchPremium
                    OnClosePremiumBuyBanner={this.OnClosePremiumBuyBanner}
                  />
                )}
                <NxtWatchVideosMainContainer isDarkTheme={isDarkTheme}>
                  {this.renderSearchVideoField()}
                  {this.renderVideosUI()}
                </NxtWatchVideosMainContainer>
              </NxtWatchRightSideSection>
            </HomeMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withHeader(Home)
