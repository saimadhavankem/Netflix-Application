import {Component} from 'react'
import Cookies from 'js-cookie'
import Poster from '../Poster'
import OriginalMovies from '../OriginalMovies'
import TrendingMovies from '../TrendingMovies'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  state = {posterDetails: ''}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const arrayLength = data.results.length
    const randomItem =
      data.results[Math.floor(Math.random() * (arrayLength - 1))]

    const updatedArray = {
      id: randomItem.id,
      title: randomItem.title,
      posterPath: randomItem.poster_path,
      backdropPath: randomItem.backdrop_path,
      overview: randomItem.overview,
    }
    this.setState({
      posterDetails: {...updatedArray},
    })
  }

  render() {
    const {posterDetails} = this.state

    return (
      <div className="home-container">
        <Poster key={posterDetails.id} details={posterDetails} />
        <TrendingMovies />
        <OriginalMovies />
        <Footer />
      </div>
    )
  }
}

export default Home
