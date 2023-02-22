import {Link} from 'react-router-dom'
import './index.css'

const PopularCard = props => {
  const {details} = props
  const {id, title, backdropPath} = details

  return (
    <Link to={`/movies/${id}`} className="link-style">
      <div className="card">
        <img className="image-size" src={backdropPath} alt={title} />
      </div>
    </Link>
  )
}

export default PopularCard
