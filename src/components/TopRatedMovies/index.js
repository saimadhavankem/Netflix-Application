import {Component} from 'react'
import Cookies from 'js-cookie'
import TopRatedCard from '../TopRatedCard'
import './index.css'

class TopRatedMovies extends Component {
  state = {TopRatedMoviesList: []}

  componentDidMount() {
    this.TopRatedMoviesDetails()
  }

  TopRatedMoviesDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedDetails = data.results.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      posterPath: eachItem.poster_path,
      backdropPath: eachItem.backdrop_path,
      overview: eachItem.overview,
    }))
    this.setState({TopRatedMoviesList: updatedDetails})
  }

  render() {
    const {TopRatedMoviesList} = this.state
    return (
      <div className="top-rated-movies-container">
        <h1>hello</h1>
        <TopRatedCard moviesList={TopRatedMoviesList} />
      </div>
    )
  }
}

export default TopRatedMovies
