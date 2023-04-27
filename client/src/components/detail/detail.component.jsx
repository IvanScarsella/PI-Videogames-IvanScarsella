import useVideogame from '../../hooks/useVideogame';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameDetail, clearDetail } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import './detail.styles.css';

function Detail() {


  const { id } = useParams()
  const dispatch = useDispatch()

  const videogame = useVideogame(state => state.videogameDetail);

  const { description, platforms, genres, image } = videogame;


  useEffect(() => {
    dispatch(getVideogameDetail(id))

    return dispatch(clearDetail())
  }, [dispatch, id])

  let splitDescrCreatedGames = []
  let newDescrCreatedGames = ""

  if (description) {
    splitDescrCreatedGames = description.split("\n") // separo el sting para renderizarlo en distintos renglones
  }

  if (description && splitDescrCreatedGames.length === 1) {
    const counter = description.length / 50

    for (let i = 1; i <= Math.ceil(counter); i++) {
      newDescrCreatedGames = newDescrCreatedGames + description.substring(50 * (i - 1), 50 * i) + "\n" // renglones de 50 caracteres
    }
  }

  if (description && splitDescrCreatedGames.length > 1) {
    newDescrCreatedGames = description
  }

  return (
    <>
      <div>

        <div>
          <Link to={'/home'}>
            <button className='detailButton'>Menú principal</button>
          </Link>
        </div>
        {videogame.image ?

          <div className="Detail">
            <div>
              <div />
              <img src={(videogame?.image?.match(/\.(jpeg|jpg|gif|png)$/) || !videogame.image) ? videogame?.image : "https://img.freepik.com/fotos-premium/solo-fondo-negro-joystick-3d-rendering_1379-4875.jpg"} alt="videogame img" />
              <div>
                <h1 className='videogameName'>{videogame.name}</h1>
                {genres && <p className='details'><b>Genres:</b> {genres.join(",")}</p>}
                <p className='details'><b>Rating:</b> {videogame?.rating}</p>
                <p className='details'><b>Released:</b> {videogame?.released}</p>
                {platforms && <p className='details'><b>Platforms:</b> {platforms.join(", ")}</p>}
              </div>
            </div>
            <div>
              <p id='description'>{newDescrCreatedGames}</p>
            </div>
          </div>
          : <h3>Cargando...</h3>}


      </div>
    </>
  );
}

export default Detail;
