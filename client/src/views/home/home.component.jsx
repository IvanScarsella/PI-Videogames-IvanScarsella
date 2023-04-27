import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getByName, getVideogames, getCurrentPages } from '../../redux/actions/actions';
import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';
import Menu from '../../components/menu/menu.component';
import './home.styles.css';


function Home() {

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);

  const [searchString, setSearchString] = useState("");

  // filtro sobre la DB

  // function handleSubmit(e){
  //   dispatch(getByName(searchString));
  // };

  // filto sobre el state
  const [filtered, setFiltered] = useState(allVideogames);

  function handleSubmit(e) {// búsqueda por nombre

    e.preventDefault();
    let juegosFiltrados = [];

    if (e.target.id === 'busqueda') {
      setSearchString(e.target.value)

      allVideogames.forEach(videogame => {
        if (videogame.name.toLowerCase().includes(e.target.value.toLowerCase()))
          juegosFiltrados.push(videogame)
      })
    }

    // if (e.target.id === 'genre' && e.target.value !== 'allGenres') { // filtro por género
    //   let temporal = []
    //   juegosFiltrados.forEach(element => {
    //     if (element.genres.includes(e.target.value)) {
    //       temporal.push(element)
    //     }
    //   });
    //   juegosFiltrados = temporal
    // }

    // if ((e.target.id === 'platform') && (e.target.value !== 'allPlatforms')) { // filtro por plataforma
    //   let temporal = []
    //   juegosFiltrados.forEach(element => {
    //     if (element.platforms.includes(e.target.value)) {
    //       temporal.push(element)
    //     }
    //   });
    //   juegosFiltrados = temporal
    // }
    // console.log(juegosFiltrados)
    // if ((e.target.id === 'originData') && (e.target.value !== 'allOrigins')) { // filtro por origen

    //   let temporal = []
    //   juegosFiltrados.forEach(element => {
    //     if (element.created === true) {
    //       temporal.push(element)
    //     }
    //   });
    //   juegosFiltrados = temporal
    // }
    setFiltered(juegosFiltrados)
  }

  useEffect(() => {
    if (allVideogames) {
      setFiltered(allVideogames)
      dispatch(getCurrentPages(filtered))
      // console.log(allVideogames[0])
    }
  }, [allVideogames])

  useEffect(() => {
    dispatch(getVideogames())
    dispatch(getByName(searchString));
    dispatch(getVideogames());
    // return (() => {            //completar
    //     clearDetail()
    // })
  }, [dispatch])
    ;
  return (
    <div className='Home'>
      <h2 className='Home-title'>PI Videogames</h2>
      <Link to='/landing'>
        <button className='backToLanding'>Volver a la landing Page</button>
      </Link>

      <Navbar handleSubmit={handleSubmit} />

      <Menu />

      {filtered ?
        <Cards allVideogames={filtered} />
        : <Cards allVideogames={allVideogames} />
      }
    </div>
  );
}

export default Home;