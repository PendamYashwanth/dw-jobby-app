import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showErrorMsg: true, errMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApi, options)
    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      console.log(data)
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameInputField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input-field"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordInputField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input-field"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderErrorMsg = () => {
    const {errMsg} = this.state
    return <p className="error-msg">* {errMsg}</p>
  }

  render() {
    const {showErrorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container d-flex flex-column justify-content-center">
        <div className="responsive-container">
          <div className="form-container">
            <div className="website-logo-container mb-3">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                alt="website logo"
              />
            </div>
            <form className="form" onSubmit={this.onSubmitLoginForm}>
              <div className="container">
                <div className="row">
                  <div className="col-12 mb-3">
                    {this.renderUsernameInputField()}
                  </div>
                  <div className="col-12 mb-3">
                    {this.renderPasswordInputField()}
                  </div>
                  <div className="col-12">
                    <button className="login-button" type="submit">
                      Login
                    </button>
                  </div>
                  <div className="col-12">
                    {showErrorMsg && this.renderErrorMsg()}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
