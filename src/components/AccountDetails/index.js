import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class AccountDetails extends Component {
  state = {dark: true}

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {dark} = this.state
    const usernameText = localStorage.getItem('username')
    const passwordText = localStorage.getItem('password')
    const encrypted = '*'.repeat(passwordText.length)

    return (
      <div className="account-page">
        <Header details={dark} />
        <div className="account-details">
          <h1 className="account-heading">Account</h1>
          <hr />
          <div className="membership-container">
            <div className="about">
              <p className="about-text">Member ship</p>
            </div>
            <div className="details">
              <p className="details-text">{usernameText}</p>
              <p className="details-text">Password: {encrypted} </p>
            </div>
          </div>
          <hr />
          <div className="membership-container">
            <div className="about">
              <p className="about-text">Plan Details</p>
            </div>
            <div className="details1">
              <p className="details-text">Premium</p>
              <p className="details-text-design">Ultra HD</p>
            </div>
          </div>
          <hr />
          <div className="button-container">
            <button
              onClick={this.onLogout}
              type="button"
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default AccountDetails
