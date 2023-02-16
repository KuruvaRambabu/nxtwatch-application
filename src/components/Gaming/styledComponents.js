import styled from 'styled-components'
import {
  TrendingVideoContaianer,
  TrendingVideosIcon,
  TrendingVideoHeading,
  TrendingVideosHeadingContainer,
  TrendingVideosUlElement,
} from '../Trending/styledComponents'

export const GamingMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

export const GamingVidoesUIMainContainer = styled(TrendingVideoContaianer)``

export const GamingVideosHeadingContainer = styled(
  TrendingVideosHeadingContainer,
)``

export const GamingVideoIconContainer = styled(TrendingVideosIcon)``

export const GamingVideoHeading = styled(TrendingVideoHeading)``

export const GamingVideoDisplayContainer = styled(TrendingVideosUlElement)`
  width: 90%;
`
