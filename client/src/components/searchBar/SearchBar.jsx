import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./SearchBar.module.css";
import { getNameVideogames } from "../../Actions/index.js";

export default function Searchbar({ videogamesPerPage, setCurrentPage }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");


    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNameVideogames(name));
        setName("");
        setCurrentPage(1);
    };



    return (
        <div className={s.container}>
            <form className={s.searchbarForm}>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e)}
                    value={name}
                    placeholder="Search..."
                    className={s.input1}
                />
                <button className={s.btn} onClick={(e) => handleSubmit(e)}>
                    GO!
                </button>
            </form>
        </div>
    );
}
