import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import PopularCard from '../PopularCard'
import Footer from '../Footer'
import './index.css'

class PopularPage extends Component {
  state = {popularMoviesList: [], dark: true}

  componentDidMount() {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        posterPath: eachItem.poster_path,
        overview: eachItem.overview,
        backdropPath: eachItem.backdrop_path,
      }))

      this.setState({popularMoviesList: updatedData})
    }
  }

  render() {
    const {popularMoviesList, dark} = this.state

    return (
      <div className="popular-page-container">
        <Header details={dark} />
        <ul className="movies-container">
          {popularMoviesList.map(eachItem => (
            <PopularCard key={eachItem.id} details={eachItem} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
}

export default PopularPage
