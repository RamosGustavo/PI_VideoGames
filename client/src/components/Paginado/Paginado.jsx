import React from "react";
import s from './Paginado.module.css';

export default function Paginado({videogamesPerPage, allVideogames, paginado, setCurrentPage}){
    const pageNumbers = [];

    // el for para saber cuantas pagunas son
    //Math.ceil redondea para arriba 
    // for(let i = 0; i <= Math.ceil(allVideogames/videogamesPerPage) - 1; i++){
    //     pageNumbers.push(i+1);
    // }
    for(let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {   //el Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
        //i <= 100/15 = 6.66 => Math.ceil(6.66) = 7 => 1 <= 7
        pageNumbers.push(i)
    }


    return(
        <div className={s.paginadoContainer}>
        {pageNumbers && pageNumbers.map(number => ( //si en pageNumber hay algo mapealo
            <span key={number}>
                <button className={s.paginadoItem} onClick={() => paginado(number)}>{number}</button> {/* y por cada elemento renderizame un boton y agregales un evento onClick, el cual establecera el numero de pagina en el que me encuentro*/}
            </span>
        ))}
    </div>
        // <nav >
        //     <ul className={s.paginadoContainer}>
        //         {
        //             pageNumbers && pageNumbers.map(number => (
        //                 <li key={number} className={s.paginadoItem} onClick={() => paginado(number)}>
        //                     <p>{number}</p>
        //                 </li>
        //             ))
        //         }
        //     </ul>
        // </nav>
    )
}