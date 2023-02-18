import {AiOutlineGoogle} from 'react-icons/ai'
import {BsTwitter, BsYoutube} from 'react-icons/bs'
import {FaInstagram} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="logo-container">
      <AiOutlineGoogle size={25} />
      <BsTwitter size={25} />
      <FaInstagram size={25} />
      <BsYoutube size={25} />
    </div>
    <p className="logo-text">Contact Us</p>
  </div>
)

export default Footer
