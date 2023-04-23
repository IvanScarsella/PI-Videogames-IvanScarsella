import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getByName, getVideogames } from '../../redux/actions/actions';
import './home.styles.css';
import Navbar from '../../components/navbar/navbar.component';
import Cards from  '../../components/cards/cards.component';

function Home() {

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.allVideogames);

    const [searchString, setSearchString] = useState("");
  
    function handleChange(e){
      e.preventDefault()
      setSearchString(e.target.value)
    }

    // filtro sobre la DB
    
    // function handleSubmit(e){
    //   dispatch(getByName(searchString));
    // };

    // filto sobre el state
    const [filtered, setFiltered] = useState();
  

  function handleSubmit(e){
    e.preventDefault();
    const filtered = allVideogames.filter((videogame)=>
      videogame.name.includes(searchString));
    setFiltered(filtered)
  }

    useEffect(() => {
        dispatch(getVideogames())
        // return (() => {            //completar
        //     clearDetail()
        // })
    }, [dispatch])
    
  return (
    <div className='Home'>
      <h2 className='Home-title'>Esta es la Home page</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
      { filtered ?
        <Cards filtered={filtered} />
        : <Cards allVideogames={allVideogames} />
      }
    </div>
  );
}

export default Home;