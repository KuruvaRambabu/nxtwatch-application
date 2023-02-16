import styled from 'styled-components'

export const WatchVideoMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90vh;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
`

export const SideBarMainContainer = styled.div`
  width: 20%;
  position: fixed;
  margin-top: 10vh;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
`

export const NxtWatchRightSideSection = styled.div`
  width: 80%;
  width: 80%;
  margin-top: 10vh;
  margin-left: 20%;
  min-height: 90vh;
`

export const VideoPlayerContainer = styled.div`
  margin: 30px;
`
export const LikesAndViewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  padding-right: 20px;
`

export const ViewsAndPublishedAtContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ViewsCount = styled.p``
export const PublishedAt = styled.li`
  padding-left: 20px;
`
export const LikesAndSaveVideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HorizontalLine = styled.hr``

export const CustomVideoPlayerBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px;
  width: 100px;
  background-color: transparent;
  margin: 5px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${props => (props.color ? '#2563eb' : '#64748b')};
`

export const ChannelsDetailsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export const ChannelLogo = styled.img`
  width: 45px;
  margin-top: 10px;
`

export const ChannelHeadingAndSubscribersContainer = styled.div`
  margin-left: 20px;
`

export const ChannelName = styled.p``
export const Subscribers = styled.p``

export const VideoDescription = styled.p``
