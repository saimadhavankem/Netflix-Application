import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class Poster extends Component {
  state = {
    posterDetails: '',
    dark: true,
    renderStatus: renderConstraints.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  btnClick = () => {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({renderStatus: renderConstraints.loading})
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
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
        renderStatus: renderConstraints.success,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
  }

  renderFailureView = () => {
    const {dark} = this.state
    return (
      <>
        <Header details={dark} />
        <div className="poster-loading-container">
          <img
            className="warning-icon"
            alt="failure view"
            src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png"
          />
          <p className="list-error-message">
            Something Went Wrong.Please Try Again
          </p>
        </div>
      </>
    )
  }

  renderLoadingView = () => {
    const {dark} = this.state
    return (
      <>
        <Header details={dark} />
        <div className="poster-loading-container">
          <div className="loading-container">
            <div className="loader-container">
              <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
            </div>
          </div>
        </div>
      </>
    )
  }

  renderSuccessView = () => {
    const {posterDetails} = this.state
    const {backdropPath, title, overview} = posterDetails
    return (
      <div
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
        }}
        className="poster-container"
      >
        <Header />
        <div className="text1-container">
          <h1 className="title-heading">{title}</h1>
          <p className="title-para">{overview}</p>
          <button type="button" className="poster-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.loading:
        return this.renderLoadingView()
      case renderConstraints.fail:
        return this.renderFailureView()
      case renderConstraints.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

export default Poster
