import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    se: '',
    em: '',
  }

  one = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  two = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt-token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }
  fail = em => {
    this.setState({
      se: true,
      em,
    })
  }
  BankLogin = async event => {
    event.preventDefault()

    const {userId, pin} = this.state
    const userDeatails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDeatails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.fail(data.error_msg)
    }
  }
  render() {
    const {userId, pin, se, em} = this.state
    const token = Cookies.get('jwt_token')
    if (token == !undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="min-con">
        <div className="ct-con">
          <div className="im-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="ima"
            />
          </div>
          <from className="from-el" onSubmit={this.BankLogin}>
            <h1 className="header">Welcome Back!</h1>
            <div className="inp-con">
              <Label htmlFor="user" className="lab">
                User ID
              </Label>
              <input
                id="user"
                placeholder="Enter User ID"
                className="inp"
                type="text"
                value={userId}
              />
            </div>
            <div className="inp-con">
              <Label htmlFor="pin" className="lab">
                PIN
              </Label>
              <input
                placeholder="Enter Pin"
                id="pin"
                className="inp"
                type="password"
                value={pin}
                onChange={this.two}
              />
            </div>
            <button className="but" type="submit">
              Login
            </button>

            <div className="ct">
              {se === true && <p className="ep">{en}</p>}
            </div>
          </from>
        </div>
      </div>
    )
  }
}
export default Login
