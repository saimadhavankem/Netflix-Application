import {Component} from 'react'
import Cookies from 'js-cookie'
import MovieCard from '../MovieCard'
import './index.css'

class TrendingNow extends Component {
  state = {TrendingMoviesArray: []}

  componentDidMount() {
    this.getTrendingMoviesDetails()
  }

  getTrendingMoviesDetails = async () => {
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
    const updatedArray = data.results.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      posterPath: eachItem.poster_path,
      overview: eachItem.overview,
      backdropPath: eachItem.backdrop_path,
    }))
    this.setState({TrendingMoviesArray: updatedArray})
  }

  render() {
    const {TrendingMoviesArray} = this.state

    return (
      <div className="trending-container">
        <MovieCard moviesList={TrendingMoviesArray} />
      </div>
    )
  }
}

export default TrendingNow
