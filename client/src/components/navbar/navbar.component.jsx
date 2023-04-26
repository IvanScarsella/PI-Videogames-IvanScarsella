import './navbar.styles.css';

function Navbar({handleChange, handleSubmit}) {
  return (
    <div className="search-box">
      <h1 className='navbarTitle'>Escriba el nombre del juego que está buscando</h1>
      <form onChange={handleSubmit}>
        <input placeholder="Búsqueda" type="search" onChange={handleChange} />
        <button type='submit' onClick={handleSubmit}>Buscar</button>
      </form>
      
    </div>
  );
}

export default Navbar;
