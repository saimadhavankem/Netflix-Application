import {Component} from 'react'
import Cookies from 'js-cookie'
import SliderCard from '../SliderCard'
import './index.css'

class OriginalMovies extends Component {
  state = {OriginalMoviesList: []}

  componentDidMount() {
    this.TopRatedMoviesDetails()
  }

  TopRatedMoviesDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
    this.setState({OriginalMoviesList: updatedDetails})
  }

  render() {
    const {OriginalMoviesList} = this.state
    return (
      <div className="top-rated-movies-container">
        <h1 className="top-rated-text">Originals</h1>
        <SliderCard moviesList={OriginalMoviesList} />
      </div>
    )
  }
}

export default OriginalMovies
