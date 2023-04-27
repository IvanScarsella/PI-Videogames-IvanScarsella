import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { createGame, changePage, getGenres, getPlatforms } from '../../redux/actions/actions'
import './create.styles.css';

function Create() {

  const [input, setInput] = useState({ // estado local que guarda los datos del form
    name: "",
    description: "",
    image: "",
    platforms: [],
    genres: [],
    released: "",
    rating: "",
  });

  const [error, setError] = useState({ // estado local que guarda los errores
    name: "",
    description: "",
    image: "",
    platforms: [],
    genres: [],
    released: "",
    rating: "",
  })

  const validate = (input) => { // validaciones del form
    let error = {}
    const regexName = new RegExp('^[A-Za-z0-9 ]+$', 'i');
    const regexImage = new RegExp('/(\.jpg|\.jpeg|\.png|\.gif)$/i.test(filename)')
    if (!input.name) {
      error.name = "Inserte un nombre"
    } if (input.name.length > 40) {
      error.name = "El nombre debe tener menos de 40 caracteres"
    } if (!regexName.test(input.name)) {
      error.name = "El nombre debe contener solo letras y números"
    } if (!regexImage.test(input.image)) {
      error.image = "El formato de la imagen no es compatible"
    } if (!input.image) {
      error.image = "Inserte una imagen"
    } if (input.genres.length === 0) {
      error.genres = "Inserte al menos un género"
    } if (!input.released) {
      error.released = "Inserte una fecha de lanzamiento"
    } if (!input.rating || input.rating < 1 || input.rating > 5 || isNaN(input.rating)) {
      error.rating = "El rating debe ser un número entre 1 y 5"
    } if (input.platforms.length === 0) {
      error.platforms = "Inserte al menos una plataforma"
    } if (!input.description) {
      error.description = "Inserte una descripción de no mas de 800 caracteres"
    } if (!input.description.length > 800) {
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

  function handleChangeInput(e) { // controla los cambios del form a medida que se van realizando
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleChangeGenres = (e) => { // controla los inputs para los géneros
    const { genres } = input
    if (e.target.value !== 'Seleccione al menos una opción') {
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

  const handleChangePlatforms = (e) => { // controla los inputs para las plataformas
    const { platforms } = input
    if (e.target.value !== 'Select one or more options...') {
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

  const handleSubmitForm = (e) => { // renderiza el botón submit si está todo ok
    e.preventDefault()
    dispatch(createGame(input));
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
    dispatch(changePage(pages)) //vuelve a la página principal
  }

  function deleteSelectValue(property, value) { // borra las opciones seleccionadas
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
      <Link to='/landing'>
        <button className='backToLanding'>Volver a la landing Page</button>
      </Link>
      <form className='createForm' onSubmit={handleSubmitForm}>

        <div>
          <label>Nombre
          </label>
          <input type='text' name='name' value={input.name} onChange={handleChangeInput} />
          {error.name && <label className='errorLabel'>{error.name}</label>}
        </div>

        <div>
          <label>Descripción
          </label>
          <input type='text' name='description' value={input.description} onChange={handleChangeInput} />
          {error.description && <label className='errorLabel'>{error.description}</label>}
        </div>

        <div>
          <label>Imagen
          </label>
          <input type='url' name='image' value={input.image} onChange={handleChangeInput} />
          {error.image && <label className='errorLabel'>{error.image}</label>}
        </div>

        <div>
          <label>Fecha de lanzamiento
          </label>
          <input type='date' name='released' value={input.released} onChange={handleChangeInput} />
          {error.released && <label className='errorLabel'>{error.released}</label>}
        </div>

        <div>
          <label>Rating
          </label>
          <input type='numbre' name='rating' value={input.rating} onChange={handleChangeInput} />
          {error.rating && <label className='errorLabel'>{error.rating}</label>}
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
        {error.genres ? <label className='errorLabel'>{error.genres}</label>
          : <div >
            {input.genres.map((d, index) => {
              if (d !== 'Seleccione al menos una opción') {
                return (<>
                  <button className='deleteButton' key={index} type="button" onClick={() => deleteSelectValue("genres", d)}>X</button>
                  <label>{d}
                    {index === input?.genres.length - 1 ? "" : ","}</label> {/* separo por coma, menos al final */}
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
        {error.platforms ? <label className='errorLabel'>{error.platforms}</label>
          : <div >
            {input.platforms.map((d, index) => {
              if (d !== 'Seleccione al menos una opción') {
                return (<>
                  <button className='deleteButton' key={index} type="button" onClick={() => deleteSelectValue("platforms", d)}>X</button>
                  <label>{d}
                    {index === input?.platforms.length - 1 ? "" : ","}</label> {/* separo por coma, menos al final */}
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
