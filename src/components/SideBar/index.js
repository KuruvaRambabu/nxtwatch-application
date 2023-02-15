import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {RiHome4Fill} from 'react-icons/ri'
import {AiFillFire} from 'react-icons/ai'
import {GiGamepad} from 'react-icons/gi'
import {CgPlayListAdd} from 'react-icons/cg'

import Cookies from 'js-cookie'

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
} from './styledComponents'
import './index.css'

const navItems = [
  {id: 'home', name: 'Home'},
  {id: 'trending', name: 'Trending'},
  {id: 'gaming', name: 'Gaming'},
  {id: 'savedVideos', name: 'Saved Videos'},
]
class SideBar extends Component {
  state = {
    activeRoute: Cookies.get('active_route'),
  }

  changeActiveRoute = event => {
    console.log('onclick route', event.target.id)
    this.setState({activeRoute: event.target.id})
    Cookies.set('active_route', event.target.id)
  }

  render() {
    const {activeRoute} = this.state
    console.log(activeRoute)
    return (
      <SideBarContainer>
        <SideBarTopSection>
          <NavItemsContainer>
            <Link
              id="home"
              onClick={this.changeActiveRoute}
              to="/"
              className="link"
            >
              <NavLiElement id="home" isActive={activeRoute === 'home'}>
                <RiHome4Fill className="nav-icon" />
                <NavItemHeading>Home</NavItemHeading>
              </NavLiElement>
            </Link>
            <Link
              id="trending"
              onClick={this.changeActiveRoute}
              to="/trending"
              className="link"
            >
              <NavLiElement isActive={activeRoute === 'trending'}>
                <AiFillFire className="nav-icon" />
                <NavItemHeading>Trending</NavItemHeading>
              </NavLiElement>
            </Link>
            <Link
              id="gaming"
              onClick={this.changeActiveRoute}
              to="/gaming"
              className="link"
            >
              <NavLiElement isActive={activeRoute === 'gaming'}>
                <GiGamepad className="nav-icon" />
                <NavItemHeading>Gaming</NavItemHeading>
              </NavLiElement>
            </Link>
            <Link
              id="savedVideos"
              onClick={this.changeActiveRoute}
              to="/saved-videos"
              className="link"
            >
              <NavLiElement isActive={activeRoute === 'savedVideos'}>
                <CgPlayListAdd className="nav-icon" />
                <NavItemHeading>Saved videos</NavItemHeading>
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
}
export default withRouter(SideBar)
