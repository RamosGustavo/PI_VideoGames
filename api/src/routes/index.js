const { Router } = require('express');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Videogame, Genre } = require("../db")
const { API_KEY } = process.env;
const { Op } = require("sequelize")

const router = Router();


const getApiInfo = async () => {
    let result = []; //uno por uno con su respectiva info
    let querries = []; //5 paginas de 20c/u = 100 arreglos de videojuegos
    let page = [1, 2, 3, 4, 5];

    page.forEach((e) => {
        querries.push(
            axios.get(`https://api.rawg.io/api/games?key=46cb4bc503654227a6f6692ade4a82eb&page=${e}`)
        );
    });

    await Promise.all(querries)
        .then((e) => { //100
            e.forEach((e) => {
                let res = e.data;
                result.push(
                    ...res.results.map((e) => {
                        const objInfo = {

                            id: e.id,
                            image: e.background_image,
                            name: e.name,
                            released: e.released,
                            rating: e.rating,
                            platforms: e.platforms.map(e => e.platform.name),
                            genres: e.genres.map(e => e.name),
                            description: e.description,

                        }

                        return objInfo;
                    })
                );
            });
        })
        .then(() => result)
        .catch((error) => console.log(error));
    return result;
}

const getDbInfo = async () => {
    let infoDb = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });

    // retorno los datos necesarios para los juegos de la DB
    infoDb = infoDb.map(({ createInDb, id, name, released, rating, platforms, genres, image }) => ({
        createInDb,
        id,
        name,
        released,
        rating,
        platforms,
        image,
        genres: genres.map((e) => e.name),

    }));
    return infoDb
};



const allGamesInfo = async () => {
    const allApiInfo = await getApiInfo();
    const allDbInfo = await getDbInfo();
    const totalInfo = allApiInfo.concat(allDbInfo)
    return totalInfo
}



router.get("/videogames", async (req, res) => {

    try {

        const { name } = req.query;

        let videogameAllName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=46cb4bc503654227a6f6692ade4a82eb`);

        if (name) {

            let videogameName = videogameAllName.data.results.filter(data => data.name.toLowerCase().includes(name.toLowerCase()))

            videogameName = videogameName.slice(0, 15);

            videogameName = videogameName.map(data => {
                return {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    released: data.released,
                    rating: data.rating,
                    image: data.background_image,
                    platforms: data.platforms?.map(data => data.platform.name),
                    genres: data.genres?.map(data => data.name)
                }
            });

            let videogameDb = await Videogame.findAll({ //se busca todas las coincidencias en la DB donde coincida su nombre con lo que me pasan por body
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    },
                },
                include: Genre
            })

            videogameDb = videogameDb.map(({ id, name, released, rating, platforms, genres, image }) => ({
                id,
                name,
                released,
                rating,
                platforms,
                genres: genres.map((genre) => genre.name),
                image
            }));

            videogameName = videogameDb.concat(videogameName)

            if (videogameName.length) {
                return res.status(200).json(videogameName)
            } else {
                return res.json({ err: "No existe ese videojuego" });
            }
        } else {

            let allVideogames = await allGamesInfo();

            res.status(200).json(allVideogames);
        }

    } catch (error) {
        console.log(error)
    }

});

router.get("/videogame/:id", async (req, res) => {
    const { id } = req.params;

    if (id.length > 9) {
        let dbGameInfo = await Videogame.findOne({
            where: { id: id },
            include: Genre
        })

        let gameDb = {
            image: dbGameInfo.image,
            name: dbGameInfo.name,
            released: dbGameInfo.released,
            rating: dbGameInfo.rating,
            platforms: dbGameInfo.platforms,
            genres: dbGameInfo.genres?.map(e => e.name),
            description: dbGameInfo.description

        }
        res.send(gameDb)

    }

    else {
        const videoGameInfoId = await axios.get(`https://api.rawg.io/api/games/${id}?key=46cb4bc503654227a6f6692ade4a82eb`);
        let gameDetail = {
            image: videoGameInfoId.data.background_image,
            name: videoGameInfoId.data.name,
            released: videoGameInfoId.data.released,
            rating: videoGameInfoId.data.rating,
            platforms: videoGameInfoId.data.platforms.map(e => e.platform.name),
            genres: videoGameInfoId.data.genres.map(e => e.name),
            description: videoGameInfoId.data.description,
            website: videoGameInfoId.data.website,
        }

        res.status(200).json(gameDetail)
        //res.status(404).send("VideoGame By Id Not Found")
    }
})

router.get("/genres", async (req, res) => {

    const apiGenreInfo = await axios.get(`https://api.rawg.io/api/genres?key=46cb4bc503654227a6f6692ade4a82eb`);
    const { results } = apiGenreInfo.data;
    //Itero cada uno de los resultados para extraer las propiedades name, si existe no la creo y si no existe la creo
    for (let i = 0; i < results.length; i++) {
        const { name } = results[i];
        // console.log(results[i]);
        await Genre.findOrCreate({
            where: { name: name },
        });
    }
    let allGenres = await Genre.findAll();

    res.status(200).json(allGenres);

})

router.post("/videogame", async (req, res) => {
    const { id, name, image, description, released, rating, genres, platforms } = req.body;
    try {
        let newVideogame = await Videogame.create({
            id,
            name,
            description,
            image,
            released,
            rating,
            platforms,
        })
        
        let findGenres = await Genre.findAll({

            where: { name: genres }

        });

        newVideogame.addGenres(findGenres);
        res.send("VideoGame Created Successfully")
        //res.send(newVideogame)

    } catch (error) {
        console.log(error)
        console.log("Error en la ruta de Post")
    }
})

module.exports = router;