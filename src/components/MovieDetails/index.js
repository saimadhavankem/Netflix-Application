import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import PopularCard from '../PopularCard'
import Footer from '../Footer'
import './index.css'

const GenreItem = props => {
  const {data} = props
  const {name} = data

  return (
    <li className="list-type">
      <p className="detail-para-text">{name}</p>
    </li>
  )
}

const SpokenText = props => {
  const {data} = props
  const {englishName} = data

  return (
    <li className="list-type">
      <p className="detail-para-text">{englishName}</p>
    </li>
  )
}

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class MovieDetails extends Component {
  state = {
    MovieDetailsList: [],
    spokenLanguages: [],
    genres: [],
    similarMoviesList: [],
    dark: false,
    renderStatus: renderConstraints.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({renderStatus: renderConstraints.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedSimilarMovies = data.movie_details.similar_movies.map(
        eachItem => ({
          id: eachItem.id,
          title: eachItem.title,
          posterPath: eachItem.poster_path,
          backdropPath: eachItem.backdrop_path,
        }),
      )

      const genresData = data.movie_details.genres.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
      }))
      const spokenLanguagesData = data.movie_details.spoken_languages.map(
        eachItem => ({
          englishName: eachItem.english_name,
        }),
      )
      const updatedMovieDetails = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
        genres: genresData,
        spokenLanguages: spokenLanguagesData,
      }

      this.setState({
        renderStatus: renderConstraints.success,
        similarMoviesList: updatedSimilarMovies,
        MovieDetailsList: updatedMovieDetails,
        genres: updatedMovieDetails.genres,
        spokenLanguages: updatedMovieDetails.spokenLanguages,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
  }

  renderFailureView = () => {
    const {dark} = this.state
    return (
      <div className="movie-detail-container">
        <Header details={dark} />
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
            <button type="button" className="btn-design">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => {
    const {dark} = this.state
    return (
      <div className="movie-detail-container">
        <Header details={dark} />
        <div className="loading-container">
          <div className="loader-container">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {
      similarMoviesList,
      spokenLanguages,
      genres,
      dark,
      MovieDetailsList,
    } = this.state
    const {
      adult,
      backdropPath,
      budget,
      overview,
      releaseDate,
      runtime,
      title,
      voteAverage,
      voteCount,
    } = MovieDetailsList

    const inHours = Math.floor(runtime / 60)
    const inMinutes = runtime % 60
    const time = `${inHours}h ${inMinutes}m`
    const adultContent = adult ? 'A' : 'U/A'
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const exactDate = date.getDate()
    const month = date.toLocaleString('default', {month: 'long'})
    let dateEnd
    const day = date.getDay().toString()
    if (day.endsWith('3')) {
      dateEnd = 'rd'
    } else if (day.endsWith('2')) {
      dateEnd = 'nd'
    } else if (day.endsWith('1')) {
      dateEnd = 'st'
    } else {
      dateEnd = 'th'
    }

    return (
      <div className="movie-detail-container">
        <div
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: '100% 100%',
          }}
          className="poster-1-container"
        >
          <Header details={dark} />
          <div className="poster-text-container">
            <p className="poster-heading">{title}</p>
            <div className="time-container">
              <p className="time-text">{time}</p>
              <p className="certificate-text">{adultContent}</p>
              <p className="year-text">{year}</p>
            </div>
            <p className="overview-text">{overview}</p>
            <button type="button" className="btn-design">
              Play
            </button>
          </div>
        </div>
        <div className="details-text-container">
          <div className="info-container">
            <p className="details-heading">Genres</p>
            {genres.map(eachText => (
              <GenreItem data={eachText} key={eachText.id} />
            ))}
          </div>
          <div className="info-container">
            <p className="details-heading">Audio Available</p>
            {spokenLanguages.map(eachText => (
              <SpokenText data={eachText} key={eachText.id} />
            ))}
          </div>
          <div className="info-container">
            <p className="details-heading">Rating Count</p>
            <p className="info-text">{voteCount}</p>
            <p className="details-heading">Rating Average</p>
            <p className="info-text">{voteAverage}</p>
          </div>
          <div className="info-container">
            <p className="details-heading">Budget</p>
            <p className="info-text">{budget}</p>
            <p className="details-heading">Release Date</p>
            <p className="info-text">{`${exactDate}${dateEnd} ${month} ${year}`}</p>
          </div>
        </div>
        <div className="similar-movie-container">
          <p className="similar-text">More Like This</p>
          <ul className="similar-container">
            {similarMoviesList.map(eachItem => (
              <PopularCard key={eachItem.id} details={eachItem} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.success:
        return this.renderSuccessView()
      case renderConstraints.loading:
        return this.renderLoadingView()
      case renderConstraints.fail:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default MovieDetails
