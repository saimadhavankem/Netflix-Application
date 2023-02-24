import {Component} from 'react'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const GenreItem = props => {
  const {data} = props
  const {name} = data

  return (
    <li className="list-type">
      <p>{name}</p>
    </li>
  )
}

class MovieDetails extends Component {
  state = {MovieDetailsList: [], similarMoviesList: [], dark: false}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
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
      similarMoviesList: updatedSimilarMovies,
      MovieDetailsList: updatedMovieDetails,
    })
  }

  render() {
    const {similarMoviesList, dark, MovieDetailsList} = this.state
    const {
      adult,
      backdropPath,
      budget,
      id,
      overview,
      posterPath,
      releaseDate,
      runtime,
      title,
      voteAverage,
      voteCount,
      genres,
      spokenLanguages,
    } = MovieDetailsList
    console.log(id)
    const inHours = Math.floor(runtime / 60)
    const inMinutes = runtime % 60
    const time = `${inHours}h ${inMinutes}m`

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
              <p className="certificate-text">U/A</p>
              <p className="year-text">2007</p>
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
            <ul>
              {genres.map(eachItem => (
                <GenreItem key={eachItem.id} data={eachItem} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetails
