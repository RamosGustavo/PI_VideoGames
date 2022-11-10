import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterVideogamesByGenre, filterByCreator, sortByName, sortByRating } from "../../Actions/index.js"
import "./Home.module.css"
import s from './Home.module.css'
import Paginado from "../Paginado/Paginado.jsx";
import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx";
import NavBar from "../NavBar/NavBar.jsx";


export default function Home(){

    const dispatch = useDispatch();
    //En allVideogames almaceno todo lo que está en el state videogames
    const allVideogames = useSelector((state) => state.videogames);
    //En genres almaceno todo lo que está en el state genres
    const genres = useSelector((state) => state.genres);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage; //15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    const [order, setOrder] = useState('');

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    //Cuando se monte el componente voy a despachar la action que trae todos los videogames
    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [dispatch])

    useEffect(() => {

    })

    //Función que vuelve a pedír todos los videojuegos en caso de querer "resetear" la página
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames());
        setCurrentPage(1);
    }

    const handleFilterGenre = (e) => {
        dispatch(filterVideogamesByGenre(e.target.value));
    }

    const handleFilterByCreator = (e) => {
        dispatch(filterByCreator(e.target.value));
    }

    const handleSortByName = (e) => {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${order}`)
    }

    const handleSortByRating = (e) => {
        e.preventDefault();
        dispatch(sortByRating(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${order}`)
    }

    return(
        <div className={s.background}>
            <div>
            <NavBar />
            </div>
            <div className={s.ordenamientosYFiltros}>
                {/* Ordenamientos */}
                <div className={s.ordenamientos}>
                    {/* Ordenamiento por orden alfabético */}   
                    <select className={s.selectSortingOrFilter} onChange={e => handleSortByName(e)}>
                        <option default>SORT BY NAME</option>
                        <option value='ascAlpha'>Alphabetically (A-Z)</option>
                        <option value='descAlpha'>Alphabetically (Z-A)</option>
                    </select>
                    {/* Ordenamiento por rating */}   
                    <select className={s.selectSortingOrFilter} onChange={e => handleSortByRating(e)}>
                        <option default>SORT BY RATING</option>
                        <option value='ascRating'>Rating (Higher-Lower)</option>
                        <option value='descRating'>Rating (Lower-Higher)</option>
                    </select>
                </div>
                {/* Reload button */}
                <button className={s.reloadButton} onClick={e => {handleClick(e)}}>
                    RELOAD GAMES
                </button>
                {/* Filtros */}
                <div className={s.filtros}>
                    {/* Por creador */}
                    <select className={s.selectSortingOrFilter} onChange={e => handleFilterByCreator(e)}>
                        <option default>All</option>
                        <option value='false'>Api videogames</option>
                        <option value='true'>User created videogames</option>
                    </select>
                    {/* Por género */}
                    <select className={s.selectSortingOrFilter} onChange={e => handleFilterGenre(e)}>
                        <option value='All' default>All</option>
                        {genres.map((g) => (
                            <option key={g.name} value={g.name}>{g.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={s.containerVideogameCards}>
                {   
                    currentVideogames.length ?
                    currentVideogames?.map((game) => {
                        return (
                                game.error? <div className={s.errorContainer}><h2 className={s.errorMessage}>Videogame not found</h2></div> :
                                <Card className={s.card} key={game.id} name={game.name} image={game.image} genres={game.genres} rating={game.rating} id={game.id}/>
                        );
                    })
                    :
                    <div>
                        <Loading />
                    </div>
                }
            </div>
                <div>
                <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado}/>
                </div>
        </div>
    )
}