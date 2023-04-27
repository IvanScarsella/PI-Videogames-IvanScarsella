import { Link } from 'react-router-dom';
import './card.styles.css';

function Card({ videogame }) {
  const { name, image, genres, id } = videogame

  return (
    <div className="card-conteiner">
      <Link to={`/detail/${id}`}>
        <h2 className='name'>{name}</h2>
        <img className='image' src={image} alt="videogame img" />
        <p className='genres'>{genres.join(", ")}</p>
      </Link>
    </div>
  );
}

export default Card;
