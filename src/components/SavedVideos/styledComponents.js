import styled from 'styled-components'
import {
  TrendingVideoContaianer,
  TrendingVideosHeadingContainer,
  TrendingVideosIcon,
} from '../Trending/styledComponents'

export const SavedVideosMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-top: 10vh;
  margin-left: 20%;
  min-height: 90vh;
`

export const SavedVideoUiContainer = styled(TrendingVideoContaianer)``

export const SavedVideosHeadingContainer = styled(
  TrendingVideosHeadingContainer,
)``

export const SavedVideosIconContainer = styled(TrendingVideosIcon)``

export const SavedVideosHeading = styled.h1``
