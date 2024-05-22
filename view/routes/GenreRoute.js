/**
 * @swagger
 * /genre/GetFromTMDB:
 *   get:
 *     summary: Get All genres data from TMDB (Movie and TV) for match Mongo DB
 *     responses:
 *       200:
 *         description: Success
 
 * /genre/Add:
 *   post:
 *     summary: Add a new genre
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *               properties:
 *                 name:
 *                   type: string
 *               example:
 *                 name: Genre Name
 *         required: true
 *         description: Add a new Genre
 *     responses:
 *       200:
 *         description: Success

 * /genre/Delete:
 *   post:
 *     summary: Delete a genre
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - genreId
 *               properties:
 *                 genreId:
 *                   type: string
 *               example:
 *                 genreId: 664d7b94341868eb5612d29e
 *         required: true
 *         description: Delete a genre by id
 *     responses:
 *       200:
 *         description: Success

 * /genre/GetAll:
 *   get:
 *     summary: Get All genres datas
 *     responses:
 *       200:
 *         description: Success
 
 * /genre/GetById/{genreId}:
 *   get:
 *     summary: GET By Id genre data
 *     parameters:
 *       - in: path
 *         name: genreId
 *         required: true
 *         scheme:
 *           type: String
 *         example:
 *           664d7b94341868eb5612d29f
 *         description: Genre UID
 *     responses:
 *       200:
 *         description: Success
 */

import express from 'express';

const router = express.Router();

import Authorization from '../../controller/middlewares/Authorization.js';
import GenreController from '../../controller/controllers/GenreController.js';
import TMDB from '../../controller/middlewares/TMDB.js';
import CongifurationConstant from '../../controller/constants/apiConstants/CongifurationConstant.js';

// Get TMDB Data
router.get('/GetFromTMDB',
    (req, res, next) => {
        var data = {
            genres: [],
            newGenres: [],
            genreType: CongifurationConstant.TMDB_GENRE_MOVIE
        }
        req.data = data;
        next()
    },
    GenreController.getAll,
    TMDB.getAllMovieGenres,
    (req, res, next) => {
        req.data.genreType = CongifurationConstant.TMDB_GENRE_TV
        next();
    },
    TMDB.getAllMovieGenres,
    TMDB.filterExistGenres,
    (req, res, next) => {
        // Validate Genres Data
        let genres = req.data.genres
        genres = Array.from(
            new Map(genres.map(genre => [genre.id, genre])).values()
        );
        req.data.genres = genres;
        next();
    },
    GenreController.addMultiple,
    (req, res, next) => {
        res.json(req.result);
    });

// POST
router.post("/Add",
    // Authorization.redSecurity,
    (req, res, next) => {
        var data = {
            genreName: req.body.genreName
        }
        const language = req.user?.currentLanguage;
        if (language == undefined) {
            data.currentLanguage = LanguageConstant.DEFAULT;
        }
        req.data = data;
        next()
    },
    GenreController.add,
    (req, res, next) => {
        res.json(req.result);
    });
router.post("/Delete",
    // Authorization.redSecurity,
    (req, res, next) => {
        var data = {
            genreId: req.body.genreId
        }
        req.data = data;
        next()
    },
    GenreController.destroy,
    (req, res, next) => {
        res.json(req.result);
    });

// GET
router.get("/GetAll",
    // Authorization.freeUser,
    (req, res, next) => {
        var data = {
        }
        req.data = data;
        next()
    },
    GenreController.getAll,
    (req, res, next) => {
        res.json(req.result);
    });
router.get("/GetById/:genreId",
    // Authorization.freeUser,
    (req, res, next) => {
        var data = {
            genreId: req.params.genreId
        }
        req.data = data;
        next()
    },
    GenreController.getById,
    (req, res, next) => {
        res.json(req.result);
    });
export default router;