import styled from 'styled-components'

export const NoResultsFoundHeading = styled.h1``

export const NoVideosFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 90vh;
  background-color: ${props => (props.isDarkTheme ? '#000000' : '#f9f9f9')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
`

export const NoVideosImg = styled.img`
  width: 40%;
`

export const NoResultsFoundDescription = styled.p``

export const RetryBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;
  margin: 5px;
  color: #ffffff;
  border: none;
  background-color: #4f46e5;
`
