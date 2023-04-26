import "../menu/menu.styles.css"
import { useDispatch, useSelector } from "react-redux"
import { increasePage, decreasePage, changePage } from "../../redux/actions/actions"
import { useEffect, useState } from "react"

export default function Menu() {
    const [arrPages, setArrPages] = useState([])
    const dispatch = useDispatch()

    const { page, pages } = useSelector(state => state)

    useEffect(() => {
        let arr = []
        for (let i = 1; i <= pages; i++) {
            arr.push(i)
        }
        setArrPages(arr)
    }, [pages])

    const changePageFunct = (p) => {
        dispatch(changePage(Number(p)))
    }

    console.log(page)

    return (
        <div className='div_menu'>
            <p>Páginas</p>
            {page!==1 && <button onClick={()=>dispatch(decreasePage())}>anterior</button>}
            {
                //all pages, and active page
                arrPages.map((p, index) => {
                    return <button key={p}
                        className='button'
                        onClick={() => changePageFunct(p)}>{p}</button>
                })
            }
            {page!==pages && <button onClick={()=>dispatch(increasePage())}>siguiente</button>}
        </div>
    )
}