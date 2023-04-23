import { Link } from 'react-router-dom';
import './card.styles.css';

function Card({videogame}) {
  const {name, rating, id,} = videogame
  return (
    <div className="card-conteiner">
      <Link to={`/detail/${id}`}>
      <h2>{name}</h2>
      <p>{rating}</p>
      <p>Telefono:</p>
      </Link>
    </div>
  );
}

export default Card;
