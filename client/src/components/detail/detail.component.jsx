import useVideogame from '../../hooks/useVideogame';
import { useEffect, useState } from 'react';
import { useParams,
  //  useNavigate 
  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameDetail } from '../../redux/actions/actions';
import './detail.styles.css';
import { Link } from 'react-router-dom';

function Detail() {

  const [isLoaded, setIsLoaded] = useState(false)

  const { id } = useParams()
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  
  const videogame = useVideogame(state => state.videogameDetail);

  const { description, platforms, genres, image } = videogame;


  useEffect(() => {
    dispatch(getVideogameDetail(id))
    setTimeout(() => {
      setIsLoaded(true)
    }, [3000])
    // return ()=>{
    //   dispatch(clearDetails())
    // }
  }, [dispatch, id])


  // const handleBackHome = () => {
  //   navigate("/videogames")
  // }

  let splitDescrCreatedGames = []
  let newDescrCreatedGames = ""

  if (description) {
    splitDescrCreatedGames = description.split("\n")
  }

  if (description && splitDescrCreatedGames.length === 1) {
    const counter = description.length / 50

    for (let i = 1; i <= Math.ceil(counter); i++) {
      newDescrCreatedGames = newDescrCreatedGames + description.substring(50 * (i - 1), 50 * i) + "\n" //30*(1-1),30*(2-1) = 0, 30
    }
  }

  if (description && splitDescrCreatedGames.length > 1) {
    newDescrCreatedGames = description
  }

  return (
    <>
      {//isLoaded ?
        <div>
          {/* <Nav /> */}
          <div className="Detail">
            <div>
              <div />
              <img src={(videogame?.image?.match(/\.(jpeg|jpg|gif|png)$/) || !videogame.image) ? videogame?.image : "https://media.discordapp.net/attachments/1073407771166380107/1079132104325087362/xbox-series-x-controller.webp"} alt="videogame img" />
              <div>
                <h1>{videogame.name}</h1>
                {/* {platforms && <p><b>Platforms:</b> {platforms.join(",")}</p>} */}
                {genres && <p><b>Genres:</b> {genres?.join(",")}</p>}
                <p><b>Rating:</b> {videogame?.rating}</p>
                <p><b>Released:</b> {videogame?.released}</p>
              </div>
            </div>
            <div>
              <p>{videogame.createdByUser ? newDescrCreatedGames : videogame?.description}</p>
            </div>
          </div>
          <div>
            <Link to={'/home'}>
            <button 
            // onClick={handleBackHome}
            >Back to home</button>
            </Link>
          </div>
        </div>
        // :
        //<Loader />
      }
    </>
  );
}

export default Detail;
