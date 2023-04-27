import "../menu/menu.styles.css"
import { useDispatch, useSelector } from "react-redux"
import { increasePage, decreasePage, changePage, getCurrentPages } from "../../redux/actions/actions"
import { useEffect, useState } from "react"

export default function Menu() {
    const [arrPages, setArrPages] = useState([])
    const dispatch = useDispatch()

    const { page, pages, allVideogames } = useSelector(state => state)

    useEffect(() => { // para saber cuantas páginas debo renderizar
        getCurrentPages(allVideogames)
        let arr = []
        for (let i = 1; i <= pages; i++) {
            arr.push(i)
        }
        setArrPages(arr)
    }, [pages])

    const changePageFunct = (p) => { // para cambiar la pàgina actual
        dispatch(changePage(Number(p)))
    }

    // console.log(page)

    return (
        <div className='div_menu'>
            <p>Páginas</p>
            {page !== 1 && <button onClick={() => dispatch(decreasePage())}>anterior</button>}
            {
                //all pages, and active page
                arrPages.map((p, index) => {
                    return <button key={p}
                        className='button'
                        onClick={() => changePageFunct(p)}>{p}</button>
                })
            }
            {page !== pages && <button onClick={() => dispatch(increasePage())}>siguiente</button>}
        </div>
    )
}