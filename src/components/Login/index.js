import {Component} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
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

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    showSubmitError: false,
    errorMessage: '',
    usernameErroMsg: '',
    passwordErroMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameInput = () => {
    const {username, usernameErroMsg} = this.state
    const showBorder = usernameErroMsg !== ''
    console.log(showBorder)
    return (
      <>
        <InputLabel htmlFor="username">USERNAME</InputLabel>
        <Input
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
          showBorder={showBorder}
        />
        {usernameErroMsg && <ErrorMessage>*{usernameErroMsg}</ErrorMessage>}
      </>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordInput = () => {
    const {password, showPassword, passwordErroMsg} = this.state
    const type = showPassword ? 'text' : 'password'
    const showBorder = passwordErroMsg !== ''

    return (
      <>
        <InputLabel htmlFor="password">PASSWORD</InputLabel>
        <Input
          type={type}
          id="password"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
          showBorder={showBorder}
        />
        {passwordErroMsg && <ErrorMessage>*{passwordErroMsg}</ErrorMessage>}
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMessage: errorMsg,
      showSubmitError: true,
      isLoading: false,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log('hello')
    if (username === '' && password === '') {
      this.setState({usernameErroMsg: 'Required', passwordErroMsg: 'Required'})
    } else if (username === '') {
      this.setState({usernameErroMsg: 'Required'})
    } else if (password === '') {
      this.setState({passwordErroMsg: 'Required'})
    } else {
      this.setState({
        isLoading: true,
        usernameErroMsg: '',
        passwordErroMsg: '',
      })
      const userDetails = {username, password}
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    }
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderShowPasswordCheckbox = () => {
    const {showPassword} = this.state
    return (
      <ShowPasswordContainer>
        <ShowPasswordCheckbox
          type="checkbox"
          id="showPassword"
          isChecked={showPassword}
          onChange={this.onClickShowPassword}
        />
        <ShowPasswordLabel htmlFor="showPassword">
          Show Password
        </ShowPasswordLabel>
      </ShowPasswordContainer>
    )
  }

  render() {
    const {errorMessage, showSubmitError, isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <LoginContainer isDarkTheme={isDarkTheme}>
              <LoginFormContainer isDarkTheme={isDarkTheme}>
                <WebsiteLogoContainer>
                  <FormLogo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                </WebsiteLogoContainer>
                <Form onSubmit={this.onSubmitForm}>
                  {this.renderUsernameInput()}
                  {this.renderPasswordInput()}
                  {this.renderShowPasswordCheckbox()}
                  {showSubmitError && (
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                  )}
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
                </Form>
              </LoginFormContainer>
            </LoginContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Login)
