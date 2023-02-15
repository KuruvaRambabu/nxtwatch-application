import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import {RiHome4Fill, RiLogoutBoxRLine} from 'react-icons/ri'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'

import {
  HeaderMainContainer,
  HeaderLiElements,
  NxtwatchLogo,
  HeaderRightSection,
  ThemeChangeBtn,
  UserProfileImg,
  LogoutBtn,
} from './styledComponents'
import './index.css'
import ThemeContext from '../Context/ThemeContext'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, onChangeTheme} = value
        const LogoUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        return (
          <HeaderMainContainer isDarkTheme={isDarkTheme}>
            <HeaderLiElements>
              <Link to="/">
                <NxtwatchLogo src={LogoUrl} alt="website logo" />
              </Link>
            </HeaderLiElements>
            <HeaderRightSection>
              <HeaderLiElements>
                <ThemeChangeBtn onClick={onChangeTheme}>
                  {isDarkTheme ? (
                    <BsBrightnessHigh className="lightTheme" />
                  ) : (
                    <BsMoon className="moon" />
                  )}
                </ThemeChangeBtn>
                <Link
                  to="/"
                  className="home-btn-mobile header-button"
                  type="button"
                >
                  <RiHome4Fill className="logout-icon" />
                </Link>
              </HeaderLiElements>
              <HeaderLiElements>
                <Link
                  to="/jobs"
                  className="home-btn header-button"
                  type="button"
                >
                  <UserProfileImg
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </Link>
                <Link
                  to="/jobs"
                  className="home-btn-mobile header-button"
                  type="button"
                >
                  sdfa
                </Link>
              </HeaderLiElements>
              <HeaderLiElements>
                <LogoutBtn
                  onClick={onClickLogout}
                  className="logout-btn"
                  type="button"
                  isDarkTheme={isDarkTheme}
                >
                  Logout
                </LogoutBtn>
                <LogoutBtn
                  onClick={onClickLogout}
                  className="logout-btn-mobile"
                  type="button"
                >
                  <RiLogoutBoxRLine className="logout-icon" />
                </LogoutBtn>
              </HeaderLiElements>
            </HeaderRightSection>
          </HeaderMainContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Header)
