import {
  NoVideosFoundContainer,
  NoVideosImg,
  NoResultsFoundHeading,
  NoResultsFoundDescription,
  RetryBtn,
} from './styledComponents'

const NoVideosFound = props => {
  const {getVideosAPI, imageLink, alt} = props
  const link =
    imageLink ||
    'https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'
  const imgAlt = alt || 'no videos'
  return (
    <NoVideosFoundContainer className="failure-container">
      <NoVideosImg src={link} alt={imgAlt} />
      <NoResultsFoundHeading>No Search Results Found</NoResultsFoundHeading>
      <NoResultsFoundDescription>
        Try different key words or remove search filters
      </NoResultsFoundDescription>
      <RetryBtn type="button" onClick={getVideosAPI}>
        Retry
      </RetryBtn>
    </NoVideosFoundContainer>
  )
}

export default NoVideosFound
