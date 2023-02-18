import Header from '../Header'
import './index.css'

const Poster = props => {
  const {details} = props
  const {title, backdropPath, overview} = details

  return (
    <div
      style={{
        backgroundImage: `url(${backdropPath})`,
        backgroundSize: '100% 100%',
      }}
      className="poster-container"
    >
      <Header />
      <div className="text-container">
        <h1>{title}</h1>
        <p>{overview}</p>
        <button type="button" className="poster-button">
          Play
        </button>
      </div>
    </div>
  )
}

export default Poster
