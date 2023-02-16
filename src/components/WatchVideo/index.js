import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {CgPlayListAdd} from 'react-icons/cg'
import {formatDistanceToNowStrict} from 'date-fns'

import withHeader from '../Hocs/withHeader'
import SideBar from '../SideBar'
import VideoPlayer from '../VideoPlayer'
import apiConstants from '../../constants/apiConstants'
import LoadingView from '../LoadingView'
import ThemeContext from '../Context/ThemeContext'

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
import './index.css'

const WatchVideo = () => {
  const [isSavedVideo, updateSavedVideoStatus] = useState(false)
  const [isLikedVideo, updateIsLikedVideo] = useState(false)
  const [isUnlikedVideo, updateIsUnlikedVideo] = useState(false)
  const [videoDetailsApiResponse, updateVideoDetailsApiResponse] = useState({
    apiStatus: apiConstants.initial,
    videoDetails: {},
  })

  const themeContext = useContext(ThemeContext)
  const {isDarkTheme, onClickSaveVideo} = themeContext

  const videoId = useParams()
  const onVideoDetailsAPISuccess = data => {
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
    updateVideoDetailsApiResponse({
      videoDetails: formattedVideoDetails,
      apiStatus: apiConstants.success,
    })
  }

  const onVideoDetailsAPIFailure = () => {
    updateVideoDetailsApiResponse(prevState => ({
      ...prevState,
      apiStatus: apiConstants.failure,
    }))
  }

  const getVideoDetailsAPI = async () => {
    const {id} = videoId

    updateVideoDetailsApiResponse(prevState => ({
      ...prevState,
      apiStatus: apiConstants.inProgress,
    }))

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
      onVideoDetailsAPISuccess(data)
    } else {
      onVideoDetailsAPIFailure()
    }
  }

  useEffect(() => {
    getVideoDetailsAPI()
  }, [])

  const renderVideoAPILoadingView = () => <LoadingView />

  const togglelike = () => {
    if (isUnlikedVideo) {
      updateIsLikedVideo(prevState => !prevState)
      updateIsUnlikedVideo(prevState => !prevState)
    } else {
      updateIsLikedVideo(prevState => !prevState)
    }
  }

  const toggleDislike = () => {
    if (isLikedVideo) {
      updateIsLikedVideo(prevState => !prevState)
      updateIsUnlikedVideo(prevState => !prevState)
    } else {
      updateIsUnlikedVideo(prevState => !prevState)
    }
  }

  const addVideoToSavedList = () => {
    const {videoDetails} = videoDetailsApiResponse
    onClickSaveVideo(videoDetails)
    updateSavedVideoStatus(prevState => !prevState)
  }

  const renderVideoAPISuccessView = () => {
    const {videoDetails} = videoDetailsApiResponse
    const {
      videoUrl,
      title,
      publishedAt,
      viewCount,
      description,
      channel,
      id,
    } = videoDetails
    const {name, profileImgUrl, subscriberCount} = channel
    const formattedDistance = formatDistanceToNowStrict(new Date(publishedAt))

    return (
      <VideoPlayerContainer>
        <VideoPlayer key={id} url={videoUrl} title={title} />
        <LikesAndViewsContainer>
          <ViewsAndPublishedAtContainer>
            <ViewsCount>{viewCount}</ViewsCount>
            <PublishedAt>{formattedDistance} ago</PublishedAt>
          </ViewsAndPublishedAtContainer>
          <LikesAndSaveVideoContainer>
            <CustomVideoPlayerBtn
              onClick={togglelike}
              color={isLikedVideo}
              type="button"
            >
              <AiOutlineLike className="like-icon" />
              Like
            </CustomVideoPlayerBtn>
            <CustomVideoPlayerBtn
              onClick={toggleDislike}
              color={isUnlikedVideo}
              type="button"
            >
              <AiOutlineDislike className="like-icon" /> Dislike
            </CustomVideoPlayerBtn>
            <CustomVideoPlayerBtn
              onClick={addVideoToSavedList}
              color={isSavedVideo}
              type="button"
            >
              <CgPlayListAdd className="save-icon" />
              {isSavedVideo ? 'Saved' : 'Save'}
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
  }

  const renderVideoAPIFailureView = () => {}

  const renderVideoPlayer = () => {
    const {apiStatus} = videoDetailsApiResponse

    switch (apiStatus) {
      case apiConstants.inProgress:
        return renderVideoAPILoadingView()
      case apiConstants.success:
        return renderVideoAPISuccessView()
      case apiConstants.failure:
        return renderVideoAPIFailureView()
      default:
        return ''
    }
  }

  return (
    <WatchVideoMainContainer
      isDarkTheme={isDarkTheme}
      data-testid="videoItemDetails"
    >
      <SideBarMainContainer isDarkTheme={isDarkTheme}>
        <SideBar />
      </SideBarMainContainer>
      <NxtWatchRightSideSection isDarkTheme={isDarkTheme}>
        {renderVideoPlayer()}
      </NxtWatchRightSideSection>
    </WatchVideoMainContainer>
  )
}

export default withHeader(WatchVideo)
