import { Link } from "react-router-dom"
import "../landing/landing.styles.css"

export default function Landing() {
  return (
    <div className="landingContainer">
      <div >
        <h1>Bienvenido al Proyecto Individual: Videogames</h1>
        <h2>Creado por Iván Scarsella</h2>
        {/* <Link to="https://www.soyhenry.com/"> */}
        <button className="henryButton">
          <a href="https://www.soyhenry.com/"><img src="https://www.soyhenry.com/_next/image?url=https%3A%2F%2Fassets.soyhenry.com%2Fhenry-landing%2Fassets%2FHenry%2Flogo-white.png&w=128&q=75"/></a>
        </button>
          <h3></h3>
        {/* </Link> */}
      </div>
      <div >
        <Link to="/home">
          <button className="landingButton">Click aquí para acceder a la página principal</button>
        </Link>
        <Link to="/create">
          <button className="landingButton">Click aquí crear un videojuego</button>
        </Link>

        {/* <button className="btn-retro btn-retro-tertiary">Sign up</button> */}
      </div>
    </div>
  )
}