import withHeader from '../Hocs/withHeader'

import SideBar from '../SideBar'
import ThemeContext from '../Context/ThemeContext'

import {
  NotFoundMainContainer,
  SideBarMainContainer,
  NxtWatchRightSideSection,
  NotFoundImg,
  NotFoundHeading,
  NotFoundDescription,
} from './styledComponents'

const NotFound = () => (
  <ThemeContext>
    {value => {
      const {isDarkTheme} = value
      const imgLink = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <NotFoundMainContainer isDarkTheme={isDarkTheme}>
          <SideBarMainContainer isDarkTheme={isDarkTheme}>
            <SideBar />
          </SideBarMainContainer>
          <NxtWatchRightSideSection isDarkTheme={isDarkTheme}>
            <NotFoundImg src={imgLink} alt="not found" />
            <NotFoundHeading>Page Not Found</NotFoundHeading>
            <NotFoundDescription>
              We are sorry, the page you requested could not be found.
            </NotFoundDescription>
          </NxtWatchRightSideSection>
        </NotFoundMainContainer>
      )
    }}
  </ThemeContext>
)

export default withHeader(NotFound)
