import {
  NoVideosFoundContainer,
  NoVideosImg,
  NoResultsFoundHeading,
  NoResultsFoundDescription,
  RetryBtn,
} from './styledComponents'
import ThemeContext from '../Context/ThemeContext'

const NoVideosFound = props => {
  const {getVideosAPI, imageLink, alt, heading, description} = props
  const link =
    imageLink ||
    'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'
  const imgAlt = alt || 'no videos'
  const pageHeading = heading || 'No Search Results Found'
  const pageDescription =
    description || 'Try different key words or remove search filters'
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <NoVideosFoundContainer isDarkTheme={isDarkTheme}>
            <NoVideosImg src={link} alt={imgAlt} />
            <NoResultsFoundHeading>{pageHeading}</NoResultsFoundHeading>
            <NoResultsFoundDescription>
              {pageDescription}
            </NoResultsFoundDescription>
            <RetryBtn type="button" onClick={getVideosAPI}>
              Retry
            </RetryBtn>
          </NoVideosFoundContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default NoVideosFound
