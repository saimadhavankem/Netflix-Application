import {useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import {RiCloseCircleFill} from 'react-icons/ri'
import {MdMenuOpen} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {details, getSearchDetails, searchBox} = props
  const [searchValue, search] = useState('')
  const [mode, setMenuMode] = useState(false)

  const searchInput = () => {
    if (searchValue !== '') {
      getSearchDetails(searchValue)
    }
  }
  const menuDetails = () => {
    setMenuMode(true)
  }
  const closeBtn = () => {
    setMenuMode(false)
  }
  const searchText = event => search(event.target.value)

  const color = details ? 1 : 0.6

  return (
    <>
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
            {searchBox && (
              <input
                className="search-input-container"
                onChange={searchText}
                type="text"
                value={searchValue}
              />
            )}
            <Link to="/search">
              <button
                type="button"
                onClick={searchInput}
                className="search-icon"
              >
                <BsSearch size={15} />
              </button>
            </Link>
          </div>
          <button className="menu-btn" type="button">
            <MdMenuOpen onClick={menuDetails} className="menu-icon" />
          </button>
          <Link to="/account">
            <img
              className="profile-image-size"
              src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660573232/Avatar_giy0y5.png"
              alt="account"
            />
          </Link>
        </div>
      </div>
      {mode && (
        <div style={{opacity: color}} className="home-containers-mobile">
          <Link to="/">
            <p className="mobile-text">Home</p>
          </Link>
          <Link to="/popular">
            <p className="mobile-text">Popular</p>
          </Link>
          <Link to="/account">
            <p className="mobile-text">Account</p>
          </Link>
          <button type="button" className="close-btn-container">
            <RiCloseCircleFill onClick={closeBtn} className="close-icon" />
          </button>
        </div>
      )}
    </>
  )
}

export default Header
