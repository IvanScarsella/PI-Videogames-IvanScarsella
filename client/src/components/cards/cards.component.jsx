import { useSelector } from "react-redux"
import Card from "../card/card.component";
import './cards.styles.css';

function Cards({ allVideogames }) {

  const { page } = useSelector(state => state)

  const videogamesList = allVideogames.slice((page - 1) * 20, page * 20) // muestro 20 videojuegos

  return (
    <div className="card-list">
      {videogamesList?.map((videogame) => (
        <Card videogame={videogame} key={videogame.id} />
      ))}
    </div>
  );
}

export default Cards;
