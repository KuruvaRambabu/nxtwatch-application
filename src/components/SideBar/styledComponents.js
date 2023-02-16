import styled from 'styled-components'

export const SideBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  height: 90vh;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
`

export const SideBarTopSection = styled.div`
  width: 100%;
`

export const SideBarBottomSection = styled.div`
  width: 100%;
`

export const NavItemsContainer = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`

export const NavLiElement = styled.li`
  background-color: ${props => (props.isActive ? '#f1f5f9' : 'inherit')};
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 20px;
  width: 100%;
  color: #000000;
  pointer-events: none;
`
export const NavItemHeading = styled.p`
  padding-left: 0px;
  width: 70%;
  text-align: left;
  pointer-events: none;
  font-weight: ${props => (props.isActive ? 'bold' : '')};
`
export const ContactUsHeading = styled.h1`
  padding-left: 20px;
  margin: 0;
  font-size: 20px;
`

export const ContactUsContainer = styled.div`
  padding-left: 10px;
  margin: 10px;
`

export const SocialMediaIcon = styled.img`
  width: 40px;
  margin-right: 5px;
`
export const SideBarDescription = styled.p`
  padding-left: 20px;
  font-size: 18px;
  font-weight: 400;
  width: 75%;
`
export const IconContainer = styled.div`
  color: ${props => (props.isActive ? '#ff0000' : '#000000')};
`
