import Card from "../card/card.component";
import './cards.styles.css';

function Cards({allVideogames}) {

    const videogamesList = allVideogames;

  return (
    <div className="card-list">
     {videogamesList?.map((videogame) => (
        <Card videogame={videogame} key={videogame.id}/>
        ))}
    </div>
  );
}

export default Cards;
