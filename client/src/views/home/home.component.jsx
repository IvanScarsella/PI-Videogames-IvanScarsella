import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getByName, getVideogames } from '../../redux/actions/actions';
import './home.styles.css';
import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';
import Menu from '../../components/menu/menu.component';
import Filter from '../../components/filter/filter.component';
import { Link } from 'react-router-dom';

function Home() {

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames);

  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    e.preventDefault()
    setSearchString(e.target.value)
  }

  // filtro sobre la DB

  // function handleSubmit(e){
  //   dispatch(getByName(searchString));
  // };

  // filto sobre el state
  const [filtered, setFiltered] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setSearchString(e.target.value)
    const filtered = allVideogames.filter((videogame) =>
    videogame.name.toLowerCase().includes(searchString.toLowerCase()));
    filtered ? setFiltered(filtered) : setSearchString(e.target.value)
    
      if(filtered === allVideogames) setFiltered(null);
  }

  useEffect(() => {
    dispatch(getVideogames())
    dispatch(getByName(searchString));
    dispatch(getVideogames());
    // return (() => {            //completar
    //     clearDetail()
    // })
  }, [dispatch])
    ; console.log(allVideogames);

  return (
    <div className='Home'>
      <h2 className='Home-title'>PI Videogames</h2>
      <Link to='/landing'>
        <button className='backToLanding'>Volver a la landing Page</button>
      </Link>
      
      <Filter />
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Menu />
    
      
    
      
      {filtered ?
        <Cards allVideogames={filtered} />
        : <Cards allVideogames={allVideogames} />
      }
    </div>
  );
}

export default Home;