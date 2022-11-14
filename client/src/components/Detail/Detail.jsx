import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../../Actions/index.js";
import s from "./Detail.module.css";

export default function Detail(props) {
    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.detail);
    const id = props.match.params.id;

    //ComponentDidMount
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        return () => {
            dispatch(resetDetail());
        };
    }, [dispatch]);

    return (
        <div className={s.container1}>
            {videogame.image ? (
                <div >
                    <div className={s.detailsTitle}>
                        <Link to="/home">
                            <div className={s.buttonPadding}>
                            <button className={s.bottonHome}><span></span>
                                <span></span>
                                <span></span>
                                <span></span>HOME</button>
                                </div>
                        </Link>
                        <h1 className={s.title1}>{videogame.name}</h1>
                    </div>
                    <img
                        className={s.imgDetail1}
                        src={videogame.image}
                        width="450"
                        height="280"
                        alt=""
                    ></img>
                    <div
                        className={s.description1}
                        dangerouslySetInnerHTML={{ __html: videogame.description }}
                    ></div>
                    <h4 className={s.texts1}>RATING: {videogame.rating}</h4>
                    <h5 className={s.texts1}>GENRES: {videogame.genres}</h5>
                    <h5 className={s.texts1}>RELEASE DATE: {videogame.releaseDate}</h5>
                    <h5 className={s.texts1}>PLATFORMS: {videogame.platforms}</h5>{" "}
                    <Link to="/home">
                        <button className={s.backButton1}>GO BACK</button>
                    </Link>
                </div>
            ) : (
                <div className={s.Loading}>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
}
