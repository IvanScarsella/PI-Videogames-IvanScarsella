import Card from "../card/card.component";
import './cards.styles.css';
import { useSelector } from "react-redux"

function Cards({ allVideogames }) {
  // const dispatch = useDispatch()

  const { page } = useSelector(state => state)
  
  const videogamesList = allVideogames.slice((page-1)*20, page*20 )

  return (
    <div className="card-list">
      {videogamesList?.map((videogame) => (
        <Card videogame={videogame} key={videogame.id} />
      ))}
    </div>
  );
}

export default Cards;
