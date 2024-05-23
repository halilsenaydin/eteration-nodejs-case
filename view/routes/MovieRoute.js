/**
 * @swagger
 * /v1/movie/pull-tmdb-datas:
 *   get:
 *     summary: Get All movie data from TMDB for match Mongo DB
 *     responses:
 *       200:
 *         description: Success, The request is OK
 *       500:
 *         description: Internal Server Error
 
 * /v1/movie/add:
 *   post:
 *     summary: Add a new movie
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - popularity
 *                 - voteAverage
 *                 - voteCount
 *                 - releaseDate
 *                 - genres
 *               properties:
 *                 title:
 *                   type: string
 *                 overview:
 *                   type: string
 *                 popularity:
 *                   type: number
 *                 voteAverage:
 *                   type: number
 *                 voteCount:
 *                   type: number
 *                 releaseDate:
 *                   type: string
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *               example:
 *                 title: Movie
 *                 overview: the best movie!
 *                 popularity: 7832.06
 *                 voteAverage: 9.8
 *                 voteCount: 1903
 *                 releaseDate: 2024-05-19
 *                 genres: ["664d8705d6af6df1d4291c15", "664d8705d6af6df1d4291c23"]
 *         required: true
 *         description: Add a new Movie
 *     responses:
 *       200:
 *         description: Success, The request is OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 
 * /v1/movie/delete:
 *   post:
 *     summary: Delete a movie
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - movieId
 *               properties:
 *                 movieId:
 *                   type: string
 *               example:
 *                 movieId: 664d8e1d7cd2cd8138028e99
 *         required: true
 *         description: Delete a movie by id
 *     responses:
 *       200:
 *         description: Success, The request is OK
 *       202:
 *         description: Accepted, The request has been accepted for processing, but the processing has not been completed
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error

 * /v1/movie/movies:
 *   get:
 *     summary: Get All movie datas
 *     responses:
 *       200:
 *         description: Success, The request is OK
 
 * /v1/movie/movies-dto:
 *   get:
 *     summary: Get All Dto movie datas
 *     responses:
 *       200:
 *         description: Success, The request is OK
 
 * /v1/movie/movies-dto/filter:
 *   get:
 *     summary: GET movie data using query
 *     parameters:
 *       - name: title
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: overview
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: releaseDate
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
 
 * /v1/movie/movies/{movieId}:
 *   get:
 *     summary: GET By Id movie data
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         scheme:
 *           type: String
 *         example:
 *           664d8e1d7cd2cd8138028e91
 *         description: Movie UID
 *     responses:
 *       200:
 *         description: Success, The request is OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error

 * /v1/movie/movies-dto/{movieId}:
 *   get:
 *     summary: GET Dto By Id movie data
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         scheme:
 *           type: String
 *         example:
 *           664d8e1d7cd2cd8138028e91
 *         description: Movie UID
 *     responses:
 *       200:
 *         description: Success, The request is OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

import express from 'express';
const router = express.Router();

import MovieController from '../../controller/controllers/MovieController.js';
import GenreController from '../../controller/controllers/GenreController.js';
import TMDB from '../../controller/middlewares/TMDB.js';
import MovieValidator from '../../controller/validators/MovieValidator.js';
import LanguageConstant from '../../controller/constants/LanguageConstant.js';

// Get TMDB Data
router.get('/pull-tmdb-datas',
    (req, res, next) => {
        var data = {
            newMovies: [],
            movies: []
        }
        req.data = data;
        next()
    },
    GenreController.getAll,
    MovieController.getAll,
    TMDB.getAllMovies,
    TMDB.filterExistMovies,
    TMDB.convertToModel,
    (req, res, next) => {
        // Validate Movie Data
        let movies = req.data.movies
        movies = Array.from(
            new Map(movies.map(movie => [movie.id, movie])).values()
        );
        req.data.movies = movies;
        next();
    },
    MovieController.addMultiple,
    (req, res, next) => {
        res.status(200).json(req.result);
    });

// POST
router.post("/add",
    (req, res, next) => {
        var data = {
            title: req.body.title,
            popularity: req.body.popularity,
            overview: req.body.overview,
            voteAverage: req.body.voteAverage,
            voteCount: req.body.voteCount,
            releaseDate: req.body.releaseDate,
            genres: req.body.genres
        }
        const language = req.user?.currentLanguage;
        if (language == undefined) {
            data.currentLanguage = LanguageConstant.DEFAULT;
        }
        req.data = data;
        next()
    },
    MovieValidator.run,
    MovieController.add,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
router.post("/delete",
    (req, res, next) => {
        var data = {
            movieId: req.body.movieId
        }
        const language = req.user?.currentLanguage;
        if (language == undefined) {
            data.currentLanguage = LanguageConstant.DEFAULT;
        }
        req.data = data;
        next()
    },
    MovieValidator.validateObjectId,
    MovieController.destroy,
    (req, res, next) => {
        res.status(200).json(req.result);
    });

// GET
router.get("/movies",
    (req, res, next) => {
        var data = {
        }
        req.data = data;
        next()
    },
    MovieController.getAll,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
router.get("/movies-dto",
    (req, res, next) => {
        var data = {
        }
        req.data = data;
        next()
    },
    MovieController.getAllDto,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
router.get("/movies-dto/filter",
    (req, res, next) => {
        var data = {
            query: req.query
        }
        req.data = data;
        next()
    },
    MovieController.getAllDtoFilter,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
router.get("/movies/:movieId",
    (req, res, next) => {
        var data = {
            movieId: req.params.movieId
        }
        const language = req.user?.currentLanguage;
        if (language == undefined) {
            data.currentLanguage = LanguageConstant.DEFAULT;
        }
        req.data = data;
        next()
    },
    MovieValidator.validateObjectId,
    MovieController.getById,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
router.get("/movies-dto/:movieId",
    (req, res, next) => {
        var data = {
            movieId: req.params.movieId
        }
        const language = req.user?.currentLanguage;
        if (language == undefined) {
            data.currentLanguage = LanguageConstant.DEFAULT;
        }
        req.data = data;
        next()
    },
    MovieValidator.validateObjectId,
    MovieController.getDtoById,
    (req, res, next) => {
        res.status(200).json(req.result);
    });
export default router;