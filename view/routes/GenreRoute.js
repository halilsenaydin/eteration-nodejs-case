/**
 * @swagger
 * /v1/genre/pull-tmdb-datas:
 *   get:
 *     summary: Get All genres data from TMDB (Movie and TV) for match Mongo DB
 *     responses:
 *       200:
 *         description: Success, The request is OK
 *       500:
 *         description: Internal Server Error
 
 * /v1/genre/add:
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
 *         description: Success, The request is OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error

 * /v1/genre/delete:
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
 *         description: Success, The request is OK
 *       202:
 *         description: Accepted, The request has been accepted for processing, but the processing has not been completed
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 
 * /v1/genre/genres:
 *   get:
 *     summary: Get All genres datas
 *     responses:
 *       200:
 *         description: Success, The request is OK
 *       500:
 *         description: Internal Server Error
 
 * /v1/genre/genres/filter:
 *   get:
 *     summary: GET genre data using query
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success, The request is OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error

 * /v1/genre/genres/{genreId}:
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
 *         description: Success, The request is OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

import express, { query } from 'express';
const router = express.Router();

import GenreController from '../../controller/controllers/GenreController.js';
import TMDB from '../../controller/middlewares/TMDB.js';
import CongifurationConstant from '../../controller/constants/apiConstants/CongifurationConstant.js';
import GenreValidator from '../../controller/validators/GenreValidator.js';
import LanguageConstant from '../../controller/constants/LanguageConstant.js';

// Get TMDB Data
router.get('/pull-tmdb-datas',
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
        res.status(200).json(req.result);
    });

// POST
router.post("/add",
    (req, res, next) => {
        var data = {
            genreName: req.body.name
        }
        const language = req.user?.currentLanguage;
        if (language == undefined) {
            data.currentLanguage = LanguageConstant.DEFAULT;
        }

        req.data = data;
        next()
    },
    GenreValidator.run,
    GenreController.add,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
router.post("/delete",
    (req, res, next) => {
        var data = {
            genreId: req.body.genreId
        }
        const language = req.user?.currentLanguage;
        if (language == undefined) {
            data.currentLanguage = LanguageConstant.DEFAULT;
        }
        req.data = data;
        next()
    },
    GenreValidator.validateObjectId,
    GenreController.destroy,
    (req, res, next) => {
        res.status(200).json(req.result);
    });

// GET
router.get("/genres",
    (req, res, next) => {
        var data = {
        }
        req.data = data;
        next()
    },
    GenreController.getAll,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
router.get("/genres/filter",
    (req, res, next) => {
        var data = {
            query: req.query
        }
        req.data = data;
        next()
    },
    GenreController.getAllFilter,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
router.get("/genres/:genreId",
    (req, res, next) => {
        var data = {
            genreId: req.params.genreId
        }
        const language = req.user?.currentLanguage;
        if (language == undefined) {
            data.currentLanguage = LanguageConstant.DEFAULT;
        }
        req.data = data;
        next()
    },
    GenreValidator.validateObjectId,
    GenreController.getById,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
export default router;