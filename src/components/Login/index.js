import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorText: '', isError: false}

  onNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({errorText: errorMsg, isError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errorText} = this.state

    return (
      <div className="login-container">
        <form onSubmit={this.submitForm} className="login-box">
          <h1 className="login-heading">Login</h1>
          <div className="input-container">
            <label className="text" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.onNameChange}
              className="input"
              id="username"
              value={username}
            />
          </div>
          <div className="input-container">
            <label className="text" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.onPasswordChange}
              className="input"
              id="password"
              value={password}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {isError && <p className="error-text">{errorText}</p>}
        </form>
      </div>
    )
  }
}

export default Login
