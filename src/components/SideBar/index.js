import {useState, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {RiHome4Fill} from 'react-icons/ri'
import {AiFillFire} from 'react-icons/ai'
import {GiGamepad} from 'react-icons/gi'
import {CgPlayListAdd} from 'react-icons/cg'
import Cookies from 'js-cookie'

import ThemeContext from '../Context/ThemeContext'

import {
  SideBarContainer,
  SideBarTopSection,
  SideBarBottomSection,
  NavItemsContainer,
  NavLiElement,
  NavItemHeading,
  ContactUsHeading,
  ContactUsContainer,
  SocialMediaIcon,
  SideBarDescription,
  IconContainer,
} from './styledComponents'
import './index.css'

const SideBar = () => {
  const active = Cookies.get('active_route')
  const route = active === null ? 'home' : active
  const [activeRoute, updateActiveRoute] = useState(route)

  const themeContext = useContext(ThemeContext)
  const {isDarkTheme} = themeContext

  const changeActiveRoute = event => {
    Cookies.set('active_route', event.target.id)
    updateActiveRoute(event.target.id)
  }

  return (
    <SideBarContainer isDarkTheme={isDarkTheme}>
      <SideBarTopSection>
        <NavItemsContainer>
          <Link id="home" onClick={changeActiveRoute} to="/" className="link">
            <NavLiElement
              isDarkTheme={isDarkTheme}
              id="home"
              isActive={activeRoute === 'home'}
            >
              <IconContainer isActive={activeRoute === 'home'}>
                <RiHome4Fill className="nav-icon" />
              </IconContainer>
              <NavItemHeading isActive={activeRoute === 'home'}>
                Home
              </NavItemHeading>
            </NavLiElement>
          </Link>
          <Link
            id="trending"
            onClick={changeActiveRoute}
            to="/trending"
            className="link"
          >
            <NavLiElement isActive={activeRoute === 'trending'}>
              <IconContainer isActive={activeRoute === 'trending'}>
                <AiFillFire className="nav-icon" />
              </IconContainer>
              <NavItemHeading isActive={activeRoute === 'trending'}>
                Trending
              </NavItemHeading>
            </NavLiElement>
          </Link>
          <Link
            id="gaming"
            onClick={changeActiveRoute}
            to="/gaming"
            className="link"
          >
            <NavLiElement isActive={activeRoute === 'gaming'}>
              <IconContainer isActive={activeRoute === 'gaming'}>
                <GiGamepad className="nav-icon" />
              </IconContainer>
              <NavItemHeading isActive={activeRoute === 'gaming'}>
                Gaming
              </NavItemHeading>
            </NavLiElement>
          </Link>
          <Link
            id="savedVideos"
            onClick={changeActiveRoute}
            to="/saved-videos"
            className="link"
          >
            <NavLiElement isActive={activeRoute === 'savedVideos'}>
              <IconContainer isActive={activeRoute === 'savedVideos'}>
                <CgPlayListAdd className="nav-icon" />
              </IconContainer>
              <NavItemHeading isActive={activeRoute === 'savedVideos'}>
                Saved videos
              </NavItemHeading>
            </NavLiElement>
          </Link>
        </NavItemsContainer>
      </SideBarTopSection>
      <SideBarBottomSection>
        <ContactUsHeading>CONTACT US</ContactUsHeading>
        <ContactUsContainer>
          <SocialMediaIcon
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <SocialMediaIcon
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <SocialMediaIcon
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </ContactUsContainer>
        <SideBarDescription>
          Enjoy! Now to see your channels and recommendations!
        </SideBarDescription>
      </SideBarBottomSection>
    </SideBarContainer>
  )
}

export default withRouter(SideBar)
