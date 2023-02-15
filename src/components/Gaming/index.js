import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiGamepad} from 'react-icons/gi'

import {
  GamingMainContainer,
  NxtWatchRightSideSection,
  SideBarMainContainer,
  GamingVidoesUIMainContainer,
  GamingVideosHeadingContainer,
  GamingVideoIconContainer,
  GamingVideoHeading,
  GamingVideoDisplayContainer,
} from './styledComponents'

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import apiConstants from '../../constants/apiConstants'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import GamingVideoCard from '../GamingVideoCard'

class Gaming extends Component {
  state = {
    gamingVideosList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getGamingVidoesAPI()
  }

  onGamingAPISuccess = data => {
    const {videos} = data
    console.log(videos)
    const formattedVideosData = videos.map(video => ({
      id: video.id,
      title: video.title,
      thumbnailUrl: video.thumbnail_url,
      viewCount: video.view_count,
    }))
    console.log(formattedVideosData)
    this.setState({
      apiStatus: apiConstants.success,
      gamingVideosList: formattedVideosData,
    })
  }

  onGamingAPIFailure = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  getGamingVidoesAPI = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
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
      this.onGamingAPISuccess(data)
    } else {
      this.onGamingAPIFailure()
    }
  }

  renderGamingVideosAPISuccess = () => {
    const {gamingVideosList} = this.state

    return (
      <GamingVidoesUIMainContainer>
        <GamingVideosHeadingContainer>
          <GamingVideoIconContainer>
            <GiGamepad className="trending-icon" />
          </GamingVideoIconContainer>
          <GamingVideoHeading>Gaming</GamingVideoHeading>
        </GamingVideosHeadingContainer>
        <GamingVideoDisplayContainer>
          {gamingVideosList.map(video => (
            <GamingVideoCard gameVideo={video} key={video.id} />
          ))}
        </GamingVideoDisplayContainer>
      </GamingVidoesUIMainContainer>
    )
  }

  renderGamingVideosUI = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return <LoadingView />
      case apiConstants.success:
        return this.renderGamingVideosAPISuccess()
      case apiConstants.failure:
        return (
          <FailureView
            failureImg="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            getVideosAPI={this.getGamingVidoesAPI}
          />
        )

      default:
        return ''
    }
  }

  render() {
    return (
      <GamingMainContainer>
        <SideBarMainContainer>
          <SideBar />
        </SideBarMainContainer>
        <NxtWatchRightSideSection>
          {this.renderGamingVideosUI()}
        </NxtWatchRightSideSection>
      </GamingMainContainer>
    )
  }
}

export default withHeader(Gaming)
