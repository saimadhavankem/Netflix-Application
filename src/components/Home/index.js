import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
  }

  render() {
    return (
      <div className="home-container">
        <h1>hello</h1>
      </div>
    )
  }
}

export default Home
