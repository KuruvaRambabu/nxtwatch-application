import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {CgPlayListAdd} from 'react-icons/cg'

import withHeader from '../Hocs/withHeader'
import {
  SideBarMainContainer,
  NxtWatchRightSideSection,
  WatchVideoMainContainer,
  VideoPlayerContainer,
  LikesAndViewsContainer,
  ViewsAndPublishedAtContainer,
  ViewsCount,
  LikesAndSaveVideoContainer,
  PublishedAt,
  HorizontalLine,
  CustomVideoPlayerBtn,
  ChannelsDetailsContainer,
  ChannelHeadingAndSubscribersContainer,
  ChannelLogo,
  ChannelName,
  Subscribers,
  VideoDescription,
} from './styledComponents'
import SideBar from '../SideBar'
import VideoPlayer from '../VideoPlayer'
import apiConstants from '../../constants/apiConstants'
import LoadingView from '../LoadingView'
import './index.css'
import SavedVideosContext from '../Context/SavedVideosContext'

class WatchVideo extends Component {
  state = {
    apiStatus: apiConstants.initial,
    videoDetails: {},
    isSavedVideo: false,
    savedVideosList: [],
    isLikedVideo: false,
    isUnlikedVideo: false,
  }

  componentDidMount() {
    this.getVideoDetailsAPI()
  }

  onVideoDetailsAPISuccess = data => {
    const videoDetails = data.video_details
    console.log(videoDetails)
    const formattedVideoDetails = {
      channel: {
        name: videoDetails.channel.name,
        profileImgUrl: videoDetails.channel.profile_image_url,
        subscriberCount: videoDetails.channel.subscriber_count,
      },
      description: videoDetails.description,
      id: videoDetails.id,
      publishedAt: videoDetails.published_at,
      thumbnailUrl: videoDetails.thumbnail_url,
      title: videoDetails.title,
      videoUrl: videoDetails.video_url,
      viewCount: videoDetails.view_count,
    }
    this.setState({
      videoDetails: formattedVideoDetails,
      apiStatus: apiConstants.success,
    })
  }

  onVideoDetailsAPIFailure = () => {
    this.setState({apiStatus: apiConstants.failure})
  }

  getVideoDetailsAPI = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiConstants.inProgress})

    const url = `https://apis.ccbp.in/videos/${id}`
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
      this.onVideoDetailsAPISuccess(data)
    } else {
      this.onVideoDetailsAPIFailure()
    }
  }

  renderVideoAPILoadingView = () => <LoadingView />

  togglelike = () => {
    const {isUnlikedVideo} = this.state
    if (isUnlikedVideo) {
      this.setState(prevState => ({
        isUnlikedVideo: false,
        isLikedVideo: !prevState.isLikedVideo,
      }))
    } else {
      this.setState(prevState => ({
        isLikedVideo: !prevState.isLikedVideo,
      }))
    }
  }

  toggleDislike = () => {
    const {isLikedVideo} = this.state
    if (isLikedVideo) {
      this.setState(prevState => ({
        isLikedVideo: false,
        isUnlikedVideo: !prevState.isUnlikedVideo,
      }))
    } else {
      this.setState(prevState => ({
        isUnlikedVideo: !prevState.isUnlikedVideo,
      }))
    }
  }

  addVideoToSavedList = () => {
    this.setState(prevState => ({isSavedVideo: !prevState.isSavedVideo}))
  }

  renderVideoAPISuccessView = () => {
    const {
      videoDetails,
      isLikedVideo,
      isUnlikedVideo,
      isSavedVideo,
    } = this.state
    const {
      videoUrl,
      title,
      publishedAt,
      id,
      viewCount,
      description,
      channel,
    } = videoDetails
    const {name, profileImgUrl, subscriberCount} = channel
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {savedVideos, onClickSaveVideo} = value
          const onClickSave = () => {
            onClickSaveVideo(videoDetails)
            this.addVideoToSavedList()
          }
          return (
            <VideoPlayerContainer>
              <VideoPlayer url={videoUrl} title={title} />
              <LikesAndViewsContainer>
                <ViewsAndPublishedAtContainer>
                  <ViewsCount>{viewCount}</ViewsCount>
                  <PublishedAt>{publishedAt}</PublishedAt>
                </ViewsAndPublishedAtContainer>
                <LikesAndSaveVideoContainer>
                  <CustomVideoPlayerBtn
                    onClick={this.togglelike}
                    color={isLikedVideo}
                    type="button"
                  >
                    <AiOutlineLike className="like-icon" />
                    Like
                  </CustomVideoPlayerBtn>
                  <CustomVideoPlayerBtn
                    onClick={this.toggleDislike}
                    color={isUnlikedVideo}
                    type="button"
                  >
                    <AiOutlineDislike className="like-icon" /> Dislike
                  </CustomVideoPlayerBtn>
                  <CustomVideoPlayerBtn
                    onClick={onClickSave}
                    color={isSavedVideo}
                    type="button"
                  >
                    <CgPlayListAdd className="save-icon" />
                    Save
                  </CustomVideoPlayerBtn>
                </LikesAndSaveVideoContainer>
              </LikesAndViewsContainer>
              <HorizontalLine />
              <ChannelsDetailsContainer>
                <ChannelLogo src={profileImgUrl} alt="channle logo" />
                <ChannelHeadingAndSubscribersContainer>
                  <ChannelName>{name}</ChannelName>
                  <Subscribers>{subscriberCount} subscribers</Subscribers>
                  <VideoDescription>{description}</VideoDescription>
                </ChannelHeadingAndSubscribersContainer>
              </ChannelsDetailsContainer>
            </VideoPlayerContainer>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }

  renderVideoAPIFailureView = () => {}

  renderVideoPlayer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderVideoAPILoadingView()
      case apiConstants.success:
        return this.renderVideoAPISuccessView()
      case apiConstants.failure:
        return this.renderVideoAPIFailureView()
      default:
        return ''
    }
  }

  render() {
    return (
      <WatchVideoMainContainer>
        <SideBarMainContainer>
          <SideBar />
        </SideBarMainContainer>
        <NxtWatchRightSideSection>
          {this.renderVideoPlayer()}
        </NxtWatchRightSideSection>
      </WatchVideoMainContainer>
    )
  }
}

export default withHeader(WatchVideo)
