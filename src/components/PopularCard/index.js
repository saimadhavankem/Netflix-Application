import {Link} from 'react-router-dom'
import './index.css'

const PopularCard = props => {
  const {details} = props
  const {id, title, backdropPath} = details

  return (
    <Link to={`/movies/${id}`} className="link-style">
      <li className="card">
        <img className="image-size" src={backdropPath} alt={title} />
      </li>
    </Link>
  )
}

export default PopularCard
