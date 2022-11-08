import React from "react";
import s from './Paginado.module.css';

export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = [];

    //Math.ceil redondea para arriba 
    for(let i = 0; i <= Math.ceil(allVideogames/videogamesPerPage) - 1; i++){
        pageNumbers.push(i+1);
    }

    return(
        <nav >
            <ul className={s.paginadoContainer}>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li key={number} className={s.paginadoItem} onClick={() => paginado(number)}>
                            <a>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}