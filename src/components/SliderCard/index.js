import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class SliderCard extends Component {
  renderSlider = () => {
    const {moviesList} = this.props
    return (
      <Slider {...settings}>
        {moviesList.map(each => (
          <Link to={`/movies/${each.id}`}>
            <li className="react-slick-item" key={each.id}>
              <img className="poster" src={each.posterPath} alt={each.title} />
            </li>
          </Link>
        ))}
      </Slider>
    )
  }

  render() {
    return (
      <div className="slick-app-container">
        <div style={{width: '80%'}}>{this.renderSlider()}</div>
      </div>
    )
  }
}

export default SliderCard
