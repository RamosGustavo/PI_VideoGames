import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import {getGenres, postVideogame, getVideogames} from '../../Actions/index.js';
import s from './CreateVideogame.module.css'

export default function CreateVideogame(){
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(state => state.genres);
    const allVideogames = useSelector(state => state.videogames);

    const [input, setInput] = useState({
        name: '',
        createdByUser: true,
        description: '',
        image: '',
        releaseDate: '',
        rating: '',
        platforms: [],
        genres: []
    })

    //Cuando se monte el component se ejecuta el dispatch
    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch])

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch])

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleSelectGenres = (e) => {
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])]
        })
    }

    const handleSelectPlatforms = (e) => {
        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])]
        })
    }

    const handleGenresDelete = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== e)
        })
    }

    const handlePlatformsDelete = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== e)
        })
    }

    const validation = {
        description : input.description
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!input.name){
            return alert('Name is required');
        } else if(!input.description){
            return alert('Description is required');
        } else if(!input.releaseDate){
            return alert('Release date is required');
        } else if(!input.rating || input.rating < 1 || input.rating > 5){
            return alert('Enter a rating between 1 and 5');
        } else if(!input.platforms.length){
            return alert('At least one platform is required');
        } else if(!input.genres.length){
            return alert('At least one genre is required');
        }

        dispatch(postVideogame(input));

        alert('Videogame created successfully!');

        setInput({
            name: '',
            createdByUser: true,
            description: '',
            image: '',
            releaseDate: '',
            rating: '',
            platforms: [],
            genres: []
        })

        history.push('/home');
    }

    //Creo set de platforms
    const platformsArray = [];
    allVideogames.map(game => game.platforms?.map(platform => platformsArray.push(platform)));
    let platformsSet = [...new Set(platformsArray)];

    return(
        <div >
            <form className={s.formContainer} onSubmit={(e) => handleSubmit(e)}>
                {/* Name */}
                <label className={s.labels}>NAME: </label>
                <div>
                    <input className={s.formInput} type='text' name='name' onChange={(e) => handleChange(e)}></input>
                    {(input.name.length < 4) ? <p>Ingrese al menos tres letras</p> : <span></span>}
                </div>
                {/* Description */}
                <label className={s.labels}>DESCRIPTION: </label>
                <div>
                    <input className={s.formInput} type='text' name='description' onChange={(e) => handleChange(e)}></input>
                    {(!validation.description) ? <p>required</p> : <span></span>}
                </div>
                {/* Image */}
                <label className={s.labels}>IMAGE: </label>
                <div>
                    <input className={s.formInput} type='text' name='image' onChange={(e) => handleChange(e)} placeholder='URL' ></input>
                </div>
                {/* Release date */}
                <label className={s.labels}>RELEASE DATE: </label>
                <div>
                    <input className={s.formInput} type='date' name='releaseDate' onChange={(e) => handleChange(e)}></input>
                    {(!input.releaseDate) ? <p>required</p> : <span></span>}
                </div>
                {/* Rating */}
                <label className={s.labels}>RATING: </label>
                <div>
                    <input className={s.formInput} type='number' name='rating' onChange={(e) => handleChange(e)} placeholder='1 - 5'></input>
                    {(!input.rating || input.rating < 1 || input.rating > 5) ? <p>required</p> : <span></span>}
                </div>
                {/* Platforms */} 
                <label className={s.labels}>PLATFORMS: </label>
                <div className={s.platformLabelsContainer}>
                    <select className={s.select} onChange={(e) => handleSelectPlatforms(e)}>
                        {
                            platformsSet.map(platform => (
                                <option key={platform} value={platform}>{platform}</option>
                            ))
                        }
                    </select>
                </div>
                {(!input.platforms.length) ? <p>required</p> : <span></span>}
                {/* Genres */}
                <label className={s.labels}>GENRES: </label>
                <div className={s.platformLabelsContainer}>
                    <select className={s.select} onChange={(e) => handleSelectGenres(e)}>
                        {
                            genres.map(genre => (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            ))
                        }
                    </select>
                </div>
                {(!input.genres.length) ? <p>required</p> : <span></span>}
                <p className={s.deleteText}>IF YOU WANT TO DELETE A GENRE OR PLATFORM, CLICK ON THE ONE YOU WANT TO DELETE</p>
                <div className={s.platformsAndGenresSelected}>
                    <div className={s.genresContainer}>    
                        {/* Genres container */}
                        <h3>GENRES SELECTED:</h3>
                        <div>
                            {
                                input.genres.map(genre => (
                                    <div>
                                        <p className={s.deleteGenreOrPlatform} onClick={() => handleGenresDelete(genre)}>{genre}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        {/* Platforms container */}
                        <h3>PLATFORMS SELECTED:</h3>
                        <div>
                            {
                                input.platforms.map(platform => (
                                    <div>
                                        <p className={s.deleteGenreOrPlatform} onClick={() => handlePlatformsDelete(platform)}>{platform}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div>
                <Link to="/home">
                                <button className={s.buttonCancel}>CANCEL</button>
                            </Link>
                    <button className={s.createButton} type='submit'>
                        CREATE
                    </button>                    
                </div>
            </form>
            
        </div>
    )
}