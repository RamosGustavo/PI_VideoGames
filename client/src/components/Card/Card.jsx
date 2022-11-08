import React from "react";
import { NavLink } from "react-router-dom";
import s from './Card.module.css'

export default function Card({name, image, genres, rating, id}){
    return(
        <div className={s.cardDiv}>
            <NavLink className={s.cardH3} to={`/videogame/${id}`}>
                <h3 className={s.bolderFont}>{name}</h3>
            </NavLink>
            <img src={image} alt='game'/>
            <h4>{rating}</h4>
            <h5>{genres}</h5>
        </div>
    )
}
