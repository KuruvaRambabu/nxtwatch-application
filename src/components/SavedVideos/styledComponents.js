import styled from 'styled-components'

export const SavedVideosMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90vh;
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
