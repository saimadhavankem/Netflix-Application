import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SliderCard from '../SliderCard'
import './index.css'

class TrendingMovies extends Component {
  state = {OriginalMoviesList: []}

  componentDidMount() {
    this.TopRatedMoviesDetails()
  }

  TopRatedMoviesDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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

  renderFailureView = () => (
    <>
      <h1 className="top-rated-text">Trending Now</h1>
      <div className="top-rated-failure-movies-container">
        <img
          className="warning-icon"
          alt="failure view"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
        />
        <p>Something Went Wrong</p>
        <button type="button">Try Again</button>
      </div>
    </>
  )

  renderLoadingView = () => (
    <>
      <h1 className="top-rated-text">Trending Now</h1>
      <div className="top-rated-failure-movies-container">
        <div className="loading-container">
          <div className="loader-container">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    </>
  )

  renderSuccess = () => {
    const {OriginalMoviesList} = this.state
    return (
      <div className="top-rated-movies-container">
        <h1 className="top-rated-text">Trending Now</h1>
        <SliderCard moviesList={OriginalMoviesList} />
      </div>
    )
  }

  render() {
    return this.renderLoadingView()
  }
}

export default TrendingMovies
