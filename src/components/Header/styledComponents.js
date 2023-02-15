import styled from 'styled-components'

export const HeaderMainContainer = styled.div`
  height: 10vh;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff ')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-left: 40px;
  padding-right: 40px;
  position: fixed;
  width: 100%;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
`

export const HeaderLiElements = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 10px;
`

export const NxtwatchLogo = styled.img`
  width: 100%;
  height: 50px;
  cursor: pointer;

  @media screen and (max-width: 567px) {
    height: 40px;
    width: 70%;
  }
`

export const HeaderRightSection = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  align-items: center;
`

export const ThemeChangeBtn = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
  background-color: transparent;
`
export const UserProfileImg = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  margin: 10px;
`

export const LogoutBtn = styled.button`
  border: 2px solid ${props => (props.isDarkTheme ? '#ffffff ' : '#3b82f6')};
  width: 100px;
  height: 30px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;
  margin: 5px;
  color: ${props => (props.isDarkTheme ? '#ffffff ' : '#3b82f6')};
`
