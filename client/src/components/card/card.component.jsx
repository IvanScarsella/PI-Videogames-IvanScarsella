import { Link } from 'react-router-dom';
import './card.styles.css';

function Card({videogame}) {
  const {name, image, genres, id} = videogame
  return (
    <div className="card-conteiner">
      <Link to={`/detail/${id}`}>
      <h2>{name}</h2>
      <img src={(image?.match(/\.(jpeg|jpg|gif|png)$/) || !image) ? image : "https://media.discordapp.net/attachments/1073407771166380107/1079132104325087362/xbox-series-x-controller.webp"} alt="videogame img" height="150px"/>
      <p>{genres.join(", ")}</p>
      </Link>
    </div>
  );
}

export default Card;
