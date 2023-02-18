import './index.css'

const PopularCard = props => {
  const {details} = props
  const {id, title, backdropPath} = details
  const onClickPopularCard = () => {
    console.log(id)
  }

  return (
    <div className="card">
      <img
        onClick={onClickPopularCard}
        className="image-size"
        src={backdropPath}
        alt={title}
      />
    </div>
  )
}

export default PopularCard
