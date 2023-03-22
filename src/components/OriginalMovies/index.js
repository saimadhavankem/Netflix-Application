import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SliderCard from '../SliderCard'
import './index.css'

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class OriginalMovies extends Component {
  state = {OriginalMoviesList: [], renderStatus: renderConstraints.initial}

  componentDidMount() {
    this.OriginalMoviesDetails()
  }

  btnClick = () => {
    this.OriginalMoviesDetails()
  }

  OriginalMoviesDetails = async () => {
    this.setState({renderStatus: renderConstraints.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedDetails = data.results.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        posterPath: eachItem.poster_path,
        backdropPath: eachItem.backdrop_path,
        overview: eachItem.overview,
      }))
      this.setState({
        OriginalMoviesList: updatedDetails,
        renderStatus: renderConstraints.success,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
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
        <p className="list-error-message">
          Something Went Wrong.Please Try Again
        </p>
        <button
          onClick={this.btnClick()}
          className="try-again-btn"
          type="button"
        >
          Try Again
        </button>
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

  renderSuccessView = () => {
    const {OriginalMoviesList} = this.state
    return (
      <div className="top-rated-movies-container">
        <h1 className="top-rated-text">Originals</h1>
        <SliderCard moviesList={OriginalMoviesList} />
      </div>
    )
  }

  render() {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.success:
        return this.renderSuccessView()
      case renderConstraints.fail:
        return this.renderFailureView()
      case renderConstraints.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default OriginalMovies
