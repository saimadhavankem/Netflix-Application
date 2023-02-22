import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PopularCard from '../PopularCard'
import './index.css'

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class SearchPage extends Component {
  state = {
    searchList: [],
    searchedValue: '',
    renderStatus: renderConstraints.initial,
    dark: true,
  }

  getSearchDetails = async searchValue => {
    this.setState({
      renderStatus: renderConstraints.loading,
      searchedValue: searchValue,
    })
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
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
      const updatedDetails = data.results.map(eachItem => ({
        id: eachItem.id,
        posterPath: eachItem.poster_path,
        backdropPath: eachItem.backdrop_path,
        title: eachItem.title,
      }))
      this.setState({
        searchList: updatedDetails,
        renderStatus: renderConstraints.success,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
  }

  renderLoader = () => {
    const {dark} = this.state
    return (
      <div className="search-page-container">
        <Header details={dark} getSearchDetails={this.getSearchDetails} />
        <div className="loading-container">
          <div className="loader-container">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    )
  }

  renderSuccess = () => {
    const {searchList, dark} = this.state
    return (
      <div className="search-page-container">
        <Header details={dark} getSearchDetails={this.getSearchDetails} />
        <ul className="search-details-container">
          {searchList.map(eachItem => (
            <PopularCard key={eachItem.id} details={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderNoResults = () => {
    const {dark, searchedValue} = this.state
    return (
      <div className="search-page-container">
        <Header details={dark} getSearchDetails={this.getSearchDetails} />
        <div className="loading-container">
          <div className="no-result-container">
            <img
              alt="Not-Found"
              className="image-height"
              src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
            />
            <p className="no-result-text">
              Your search for {searchedValue} did not find any matches.
            </p>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    const {dark} = this.state
    return (
      <div className="search-page-container">
        <Header details={dark} getSearchDetails={this.getSearchDetails} />
        <div className="loading-container">
          <div className="no-result-container">
            <img
              alt="try-again"
              className="image-height"
              src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/failure_img_vggqi4.svg"
            />
            <p className="no-result-text">
              Something went wrong. Please try again
            </p>
            <button
              type="button"
              onClick={this.getSearchDetails()}
              className="btn-design"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderMoviesList = () => {
    const {searchList} = this.state
    if (searchList.length > 0) {
      return this.renderSuccess()
    }
    return this.renderNoResults()
  }

  renderInitialPage = () => {
    const {dark} = this.state
    return (
      <div className="search-page-container">
        <Header details={dark} getSearchDetails={this.getSearchDetails} />
      </div>
    )
  }

  render() {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.success:
        return this.renderMoviesList()
      case renderConstraints.failure:
        return this.renderFailureView()
      case renderConstraints.loading:
        return this.renderLoader()
      case renderConstraints.initial:
        return this.renderInitialPage()
      default:
        return null
    }
  }
}

export default SearchPage
