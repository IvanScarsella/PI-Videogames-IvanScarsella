import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentPages, restartCurrentPage, clearFilters, filterChangeValue, filterGames, getGenres, getPlatforms } from
    "../../redux/actions/actions"
import  "../filter/filter.styles.css"

export default function FilterBy() {
    const [flagExecuteFilterGames, setFlagExecuteFilterGames] = useState(false) //flag to execute the filter
    
    let { allVideogames, filters, page, pages, apiPlatforms, apiGenres } = useSelector(s => s)
    const dispatch = useDispatch()

    const handleChangeValue = (e) => { //getting checkboxes values
        dispatch(filterChangeValue(e.target.name, e.target.value))
        setFlagExecuteFilterGames(prev => !prev)
    }


    useEffect(() => { //executng the function filter
        dispatch(getGenres())
        dispatch(getPlatforms())
        dispatch(filterGames(allVideogames, filters))
    }, [dispatch, allVideogames, filters, flagExecuteFilterGames])

    allVideogames = useSelector(s => s.allVideogames) //updating it

    //executed every time the page and pages change, we get new data
    useEffect(() => {
        //updating the data from current pages based by page
        if (pages > page) {
            dispatch(getCurrentPages(allVideogames))
        }
    }, [dispatch, allVideogames, pages, page])

    const handleRestart = () => {
        const find = Object.values(filters).find(e => e !== "") //["", "", "", ""] => not clearing the data
        if (find) {
            dispatch(clearFilters())
            dispatch(restartCurrentPage(allVideogames))
        }
    }

    return (
        <form>
            <h1 className="filter">Puede filtrar los juegos y ordenarlos</h1>
            <div>
                <select name="genre" value={filters.genre} onChange={handleChangeValue}>
                    <option value="" >Género</option>
                    {apiGenres[0]?.map(genre => {
                        return <option name={genre.name} key={genre.name} value={genre.name}>{genre.name}</option>
                    })}
                </select>

                <select name="platform" value={filters.platform} onChange={handleChangeValue}>
                    <option value="" >Plataforma</option>
                    {apiPlatforms[0]?.map(platf => {
                        return <option name={platf.name} key={platf.name} value={platf.name}>{platf.name}</option>
                    })}
                </select>

                <select name="originData" value={filters.originData} onChange={handleChangeValue}>
                    <option>Origen</option>
                    <option value="all">Todos</option>
                    <option value="db">DB</option>
                    <option value="api">API</option>
                </select>

                <select name="order" value={filters.order}
                    onChange={handleChangeValue}>
                    <option value="" >Orden</option>

                    <optgroup label="-rating">
                        <option value="max-min">Mayor a menor</option>
                        <option value="min-max">Menor a mayor</option>
                    </optgroup>

                    <optgroup label="-alfabético">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </optgroup>
                </select>

                <div >
                    <button onClick={() => handleRestart()}>Borrar filtro
                    </button>
                </div>
            </div>

            {/* <div >
                <button onClick={() => handleRestart()} type="button"

                >Borrar filtro
                </button>
            </div> */}
        </form>
    )
}