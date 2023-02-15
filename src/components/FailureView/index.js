import {
  FailureViewContainer,
  FailureViewImg,
  FailureViewDescription,
  RetryBtn,
  FailureViewHeading,
} from './styledComponents'

const FailureView = props => {
  const {failureImg, getVideosAPI, alt} = props
  return (
    <FailureViewContainer>
      <FailureViewImg src={failureImg} alt={alt} />
      <FailureViewHeading>Oops! Something Went Wrong</FailureViewHeading>
      <FailureViewDescription>
        We are having some trouble to complete your request. Please try again.
      </FailureViewDescription>
      <RetryBtn type="button" onClick={getVideosAPI}>
        Retry
      </RetryBtn>
    </FailureViewContainer>
  )
}

export default FailureView
