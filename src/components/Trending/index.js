import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillFire} from 'react-icons/ai'

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

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'

import apiConstants from '../../constants/apiConstants'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import NoVideosFound from '../NoVideosFound'
import TrendingVideoCard from '../TrendingVideoCard'
import ThemeContext from '../Context/ThemeContext'

class Trending extends Component {
  state = {
    apiStatus: apiConstants.initial,
    trendingVideosList: [],
  }

  componentDidMount() {
    this.getTrendingVideoAPI()
  }

  onVideosAPIFailure = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  getTrendingVideoAPI = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

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
      this.onVideosAPISuccess(data)
    } else {
      this.onVideosAPIFailure()
    }
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
      trendingVideosList: formattedVideosData,
    })
  }

  renderTrendingVideosAPISuccess = () => {
    const {trendingVideosList} = this.state

    if (trendingVideosList.length > 0) {
      return (
        <ThemeContext.Consumer>
          {value => {
            const {isDarkTheme} = value

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
                    <TrendingVideoCard trendingVideo={trendingVideo} />
                  ))}
                </TrendingVideosUlElement>
              </TrendingVideoContaianer>
            )
          }}
        </ThemeContext.Consumer>
      )
    }
    return <NoVideosFound />
  }

  renderTrendingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return <LoadingView />
      case apiConstants.success:
        return this.renderTrendingVideosAPISuccess()
      case apiConstants.failure:
        return (
          <FailureView
            failureImg="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            getVideosAPI={this.getTrendingVideoAPI}
          />
        )

      default:
        return ''
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <TrendingMainContainer
              data-testid="trending"
              isDarkTheme={isDarkTheme}
            >
              <SideBarMainContainer isDarkTheme={isDarkTheme}>
                <SideBar />
              </SideBarMainContainer>
              <TrendingRightSideSection>
                <Container isDarkTheme={isDarkTheme}>
                  {this.renderTrendingVideos()}
                </Container>
              </TrendingRightSideSection>
            </TrendingMainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withHeader(Trending)
