import styled from 'styled-components'

export const LoginContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#383838' : '#ffffff')};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#383838')};
`

export const LoginFormContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24%;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background-color: ${props => (props.isDarkTheme ? '#000000' : '#ffffff')};
  @media screen and (max-width: 567px) {
    width: 100%;
    margin: 10px;
  }
`

export const WebsiteLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
`

export const FormLogo = styled.img`
  width: 60%;
  height: 56px;
`

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`

export const ErrorMessage = styled.p`
  color: #ff0b37;
`

export const LoaderContainer = styled.div`
  height: 40px;
  margin-top: 25px;
  background-color: #3b82f6;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
`

export const LoginBtn = styled.button`
  height: 40px;
  margin-top: 25px;
  background-color: #3b82f6;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  color: #ffffff;
`

export const InputLabel = styled.label`
  display: flex;
  flex-grow: 1;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
`
export const Input = styled.input`
  flex-grow: 1;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-top: 2px;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid ${props => (props.showBorder ? '#ff0b37' : '#d7dfe9')};
`

export const ShowPasswordContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`
export const ShowPasswordCheckbox = styled.input`
  height: 15px;
  width: 20px;
`

export const ShowPasswordLabel = styled.label`
  padding-left: 5px;
`
