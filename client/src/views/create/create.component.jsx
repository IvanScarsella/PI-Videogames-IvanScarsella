import './create.styles.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGame, changePage, getGenres, getPlatforms } from '../../redux/actions/actions'
// import { useParams } from 'react-router-dom';

function Create() {

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    platforms: [],
    genres: [],
    released: "",
    rating: "",
  });


  const [error, setError] = useState({
    name: "",
    description: "",
    image: "",
    platforms: [],
    genres: [],
    released: "",
    rating: "",
  })

  const validate = (input) => {
    let error = {}
    const regexName = new RegExp('^[A-Za-z0-9 ]+$', 'i');
    if (!input.name) {
      error.name = "Inserte un nombre"
    } if (input.name.length > 40) {
      error.name = "El nombre debe tener menos de 40 caracteres"
    } else if (!regexName.test(input.name)) {
      error.name = "El nombre debe contener solo letras y números"
    } else if (!input.image) {
      error.image = "Inserte una imagen"
    } else if (input.genres.length === 0) {
      error.genres = "Inserte al menos un género"
    } else if (!input.released) {
      error.released = "Inserte una fecha de lanzamiento"
    } else if (!input.rating || input.rating < 1 || input.rating > 5) {
      error.rating = "El rating tiene que estar entre 1 y 5 puntos"
    } else if (input.platforms.length === 0) {
      error.platforms = "Inserte al menos una plataforma"
    } else if (!input.description) {
      error.description = "Inserte una descripción de no mas de 800 caracteres"
    } else if (!input.description.length > 800) {
      error.description = "La descripción debe tener menos de 800 caracteres"
    }
    return error
  }


  const { pages, apiGenres, apiPlatforms } = useSelector(state => state)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getPlatforms())
  }, [dispatch])

  function handleChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleChangeGenres = (e) => {
    const { genres } = input
    if (e.target.value !== 'Seleccione al menos una opción') { //select one or more can not be added
      const find = genres.find(f => f === e.target.value)
      if (!find) {
        setInput({
          ...input,
          genres: [...input.genres, e.target.value]
        })
        setError(validate({
          ...input,
          [e.target.name]: e.target.value
        }))
      }
    }
  }

  const handleChangePlatforms = (e) => {
    const { platforms } = input
    if (!input.image) { //defaultImage
      setInput({
        ...input,
        image: 'https://thumbs.dreamstime.com/b/gorila-gorila-del-silverback-22730829.jpg'
      })
    }
    if (e.target.value !== 'Select one or more options...') { //select one or more can not be added
      const find = platforms.find(f => f === e.target.value)
      if (!find) {
        setInput({
          ...input,
          platforms: [...input.platforms, e.target.value]
        })
        setError(validate({
          ...input,
          [e.target.name]: e.target.value
        }))
      }
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    dispatch(createGame(input));
    if (Object.values(input).length === 7 && error.name !== null) { //obtiene los datos
      setInput({
        name: "",
        description: "",
        image: "",
        platforms: [],
        genres: [],
        released: "",
        rating: ""
      })
      alert("Has creado un videojuego con éxito")
      // navigate("/videogames")
      dispatch(changePage(pages)) //reinitiating the page to 
    }
  }

  function deleteSelectValue(property, value) {
    const filter = input[property].filter(p => p !== value)
    setInput({
      ...input,
      [property]: filter
    })
    if (filter.length === 0) {
      setError(validate({
        ...input,
        [property]: []
      }))
    }
  }

  return (
    <div className="Create">
      <form onSubmit={handleSubmitForm}>

        <div>
          <label>Nombre
          </label>
          <input type='text' name='name' value={input.name} onChange={handleChangeInput} />
          {error.name && <label >{error.name}</label>}
        </div>

        <div>
          <label>Descripción
          </label>
          <input type='text' name='description' value={input.description} onChange={handleChangeInput} />
        </div>

        <div>
          <label>Imagen
          </label>
          <input type='url' name='image' value={input.image} onChange={handleChangeInput} />
        </div>

        <div>
          <label>Fecha de lanzamiento
          </label>
          <input type='date' name='released' value={input.released} onChange={handleChangeInput} />
        </div>

        <div>
          <label>Rating
          </label>
          <input type='numbre' name='rating' value={input.rating} onChange={handleChangeInput} />
        </div>

        {/****  GENRES ******/}
        <label htmlFor="genres" >Género</label>
        <select name="genres" value={input.genres.length === 0 ? "" : input.genres[input.genres.length - 1]}
          onChange={handleChangeGenres}>
          <option>Seleccione al menos una opción</option>
          {apiGenres[0]?.sort((a, b) => a?.name.localeCompare(b?.name)).map((genre) => {
            return <option name={genre?.name} key={genre?.name} value={genre?.name}>{genre?.name}</option>
          })}
        </select>
        {error.genres ? <label >{error.genres}</label>
          : <div >
            {input.genres.map((d, index) => {
              if (d !== 'Seleccione al menos una opción') { //select one or more can not be selected
                return (<>
                  <button key={index} type="button" onClick={() => deleteSelectValue("genres", d)}>x</button>
                  <label>{d}
                    {index === input?.genres.length - 1 ? "" : ","}</label> {/* separando por coma menos al final */}
                </>)
              }
              return null
            })}
          </div>}

        {/****  PLATFORMS ******/}
        <label htmlFor="platforms" >Plataforma</label>
        <select name="platforms" value={input.platforms.length === 0 ? "" : input.platforms[input.platforms.length - 1]}
          onChange={handleChangePlatforms}>
          <option>Seleccione al menos una opción</option>
          {apiPlatforms[0]?.sort((a, b) => a?.name.localeCompare(b?.name)).map((platform) => {
            return <option name={platform?.name} key={platform?.name} value={platform?.name}>{platform?.name}</option>
          })}
        </select>
        {error.platforms ? <label >{error.platforms}</label>
          : <div >
            {input.platforms.map((d, index) => {
              if (d !== 'Seleccione al menos una opción') { //select one or more can not be selected
                return (<>
                  <button key={index} type="button" onClick={() => deleteSelectValue("platforms", d)}>x</button>
                  <label>{d}
                    {index === input?.platforms.length - 1 ? "" : ","}</label> {/* separando por coma menos al final */}
                </>)
              }
              return null
            })}
          </div>}

        {error.name ||
          error.description ||
          error.genres ||
          error.image ||
          error.platforms ||
          error.rating ||
          error.released ? null : <button type='submit' >Submit</button>}
      </form>
    </div>
  );
}

export default Create;
