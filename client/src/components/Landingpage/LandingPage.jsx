import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
    return (
        <div className={s.conteiner}>
            <h1 className={s.title}>Your Video Games Page</h1>
            <div className={s.butoton1}>
                <Link to="/home">
                    <div className={s.landingPadding}>
                    <button className={s.buttonLanding}> <span></span>
                        <span></span>
                        <span></span>
                        <span></span>START</button>
                        </div>
                </Link>
            </div>
            <h5 className={s.h5}>Created by: Ramos Gustavo!</h5>
        </div>
    );
}
