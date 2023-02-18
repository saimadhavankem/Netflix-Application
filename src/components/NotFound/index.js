import './index.css'

const NotFound = props => {
  const homeButton = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <div className="text-container">
        <h1 className="heading">Lost Your Way?</h1>
        <p className="para">
          we are sorry the page you requested could not be found Please go back
          to the homepage.
        </p>
        <button type="button" onClick={homeButton} className="btn-design">
          Go To Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
