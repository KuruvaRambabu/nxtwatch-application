import {useState} from 'react'
import {withRouter, Redirect, useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ThemeContext from '../Context/ThemeContext'

import {
  LoginContainer,
  LoginFormContainer,
  WebsiteLogoContainer,
  FormLogo,
  Form,
  ErrorMessage,
  LoaderContainer,
  LoginBtn,
  InputLabel,
  Input,
  ShowPasswordContainer,
  ShowPasswordCheckbox,
  ShowPasswordLabel,
} from './styledComponents'

const Login = () => {
  //   state = {
  //     username: '',
  //     password: '',
  //     isLoading: false,
  //     showSubmitError: false,
  //     errorMessage: '',
  //     usernameErroMsg: '',
  //     passwordErroMsg: '',
  //     showPassword: false,
  //   }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoadingStatus] = useState(false)
  const [showSubmitError, setSubmitError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErroMessage] = useState('')
  const history = useHistory()

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onClickShowPassword = () => {
    setShowPassword(prevState => !prevState)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    setLoadingStatus(false)
    setSubmitError(true)
    setErroMessage(errorMsg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    setLoadingStatus(true)
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderUsernameInput = () => (
    <>
      <InputLabel htmlFor="username">USERNAME</InputLabel>
      <Input
        type="text"
        id="username"
        value={username}
        placeholder="Username"
        onChange={onChangeUsername}
      />
    </>
  )

  const renderPasswordInput = () => {
    const type = showPassword ? 'text' : 'password'

    return (
      <>
        <InputLabel htmlFor="password">PASSWORD</InputLabel>
        <Input
          type={type}
          id="password"
          value={password}
          placeholder="Password"
          onChange={onChangePassword}
        />
      </>
    )
  }

  const renderShowPasswordCheckbox = () => (
    <ShowPasswordContainer>
      <ShowPasswordCheckbox
        type="checkbox"
        id="showPassword"
        isChecked={showPassword}
        onChange={onClickShowPassword}
      />
      <ShowPasswordLabel htmlFor="showPassword">
        Show Password
      </ShowPasswordLabel>
    </ShowPasswordContainer>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const websiteLogoUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        return (
          <LoginContainer isDarkTheme={isDarkTheme}>
            <LoginFormContainer isDarkTheme={isDarkTheme}>
              <WebsiteLogoContainer>
                <FormLogo src={websiteLogoUrl} alt="website logo" />
              </WebsiteLogoContainer>
              <Form onSubmit={onSubmitForm}>
                {renderUsernameInput()}
                {renderPasswordInput()}
                {renderShowPasswordCheckbox()}

                {isLoading ? (
                  <LoaderContainer data-testid="loader">
                    <Loader
                      type="Oval"
                      color="#ffffff"
                      height="30"
                      width="50"
                    />
                  </LoaderContainer>
                ) : (
                  <LoginBtn className="login-button" type="submit">
                    Login
                  </LoginBtn>
                )}
                {showSubmitError && (
                  <ErrorMessage>*{errorMessage}</ErrorMessage>
                )}
              </Form>
            </LoginFormContainer>
          </LoginContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(Login)
