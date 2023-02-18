import {useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {details, getSearchDetails} = props
  const [searchValue, search] = useState('')

  const searchInput = () => {
    if (searchValue !== '') {
      getSearchDetails(searchValue)
    }
  }

  const searchText = event => search(event.target.value)

  const color = details ? 1 : 0.6

  return (
    <div style={{opacity: color}} className="header-container">
      <div className="left-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dps34f4by/image/upload/v1646985280/Group_7399_1_rs0qmy.png"
            className="logo-size"
            alt="logo"
          />
        </Link>
        <Link to="/">
          <p className="option-text">Home</p>
        </Link>

        <Link to="/popular">
          <p className="option-text">Popular</p>
        </Link>
      </div>
      <div className="right-container">
        <div className="main-input-container">
          <input
            className="search-input-container"
            onChange={searchText}
            type="text"
            value={searchValue}
          />
          <Link to="/search">
            <button type="button" onClick={searchInput} className="search-icon">
              <BsSearch size={15} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
