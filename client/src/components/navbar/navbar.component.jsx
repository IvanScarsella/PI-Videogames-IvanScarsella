import './navbar.styles.css';

function Navbar({handleChange, handleSubmit}) {
  return (
    <div className="search-box">
      <form onChange={handleSubmit}>
        <input placeholder="Búsqueda" type="search" onChange={handleChange} />
        <button type='submit' onClick={handleSubmit}>Buscar</button>
      </form>
      
    </div>
  );
}

export default Navbar;
