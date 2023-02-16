import styled from 'styled-components'

export const NotFoundMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
`

export const NotFoundImg = styled.img`
  width: 35%;
  height: 51vh;
`

export const NotFoundHeading = styled.h1``

export const NotFoundDescription = styled.p``
