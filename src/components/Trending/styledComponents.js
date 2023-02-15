import styled from 'styled-components'

export const TrendingMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SideBarMainContainer = styled.div`
  width: 20%;
  margin-top: 10vh;
  position: fixed;

  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
`

export const TrendingRightSideSection = styled.div`
  width: 80%;
  margin-top: 10vh;
  margin-left: 20%;
  min-height: 90vh;
`

export const TrendingVideoContaianer = styled.div`
  width: 100%;
`

export const TrendingVideosHeadingContainer = styled.div`
  display: flex;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  padding: 20px;
`

export const TrendingVideosIcon = styled.div`
  height: 100px;
  background-color: #e2e8f0;
  width: 100px;
  border-radius: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TrendingVideoHeading = styled.h1``

export const TrendingVideosUlElement = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  align-items:center
  margin: 10px;
  padding: 0;
  width: 90%;
`

export const Container = styled.div``
