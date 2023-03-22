import {Component} from 'react'
import Poster from '../Poster'
import OriginalMovies from '../OriginalMovies'
import TrendingMovies from '../TrendingMovies'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Poster />
        <TrendingMovies />
        <OriginalMovies />
        <Footer />
      </div>
    )
  }
}

export default Home
