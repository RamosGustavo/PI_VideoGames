import React, { Fragment } from "react";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar.jsx";

export default function NavBar() {
    return (
        <Fragment>
            <div className={s.nav}>
                <div className={s.TitleAndSearchBar}>
                    <div className={s.logoAndTitle}>
                        <Link to="/home"></Link>
                        <div className={s.Createg2}>
                            <Link to={"/videogames"} className={s.Createg1}>
                                Create Your Game!
                            </Link>
                        </div>
                    </div>
                    <div>
                        <SearchBar />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
