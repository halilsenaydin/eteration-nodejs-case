import ErrorLogConstant from "../constants/logConstants/ErrorLogConstant.js";
import LogTypeConstant from "../constants/logConstants/LogTypeConstant.js";
import MovieService from "../dataAccess/services/MovieService.js";
import SuccessLogConstant from "../constants/logConstants/SuccessLogConstant.js";
import Result from '../../core/entities/Result.js';
import DataResult from '../../core/entities/DataResult.js';

const movieService = new MovieService();
export default class MovieController {
    constructor({ movieService }) {
        this.movieService = movieService;
    }

    add(req, res, next) {
        let entity = {
            title: req.data.title,
            popularity: req.data.popularity,
            overview: req.data.overview,
            voteAverage: req.data.voteAverage,
            voteCount: req.data.voteCount,
            releaseDate: req.data.releaseDate,
            genres: req.data.genres
        }
        this.movieService.add(entity)
            .then(succ => {
                req.result = new Result(true, SuccessLogConstant.SUCCESS_MOVIE_ADD);
                return next();
            })
            .catch(err => {
                const log = {
                    logTypeId: LogTypeConstant.ERROR_MOVIE,
                    caption: ErrorLogConstant.ERROR_MOVIE_ADD,
                    content: JSON.stringify(err),
                    description: JSON.stringify(entity),
                    loggingDate: Date.now(),
                    status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_MOVIE_ADD);
                return next({ result: result, log: log });
            });
    }
    addMultiple(req, res, next) {
        let movies = req.data.movies;
        this.movieService.addMultiple(movies)
            .then(succ => {
                req.result = new Result(true, SuccessLogConstant.SUCCESS_MOVIE_ADD_MULTIPLE);
                return next();
            })
            .catch(err => {
                const log = {
                    logTypeId: LogTypeConstant.ERROR_MOVIE,
                    caption: ErrorLogConstant.ERROR_MOVIE_ADD_MULTIPLE,
                    content: JSON.stringify(err),
                    description: JSON.stringify(movies),
                    loggingDate: Date.now(),
                    status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_MOVIE_ADD_MULTIPLE);
                return next({ result: result, log: log });
            });
    }
    destroy(req, res, next) {
        const movieId = req.data.movieId;
        this.movieService.delete(movieId)
            .then(result => {
                if (result == null) {
                    let result = new Result(false, ErrorLogConstant.ERROR_MOVIE_DELETE_NOT_FOUND_MOVIE);
                    return res.status(202).json(result);
                }
                req.result = new Result(true, SuccessLogConstant.SUCCESS_MOVIE_DELETE);
                return next();
            })
            .catch(err => {
                const log = {
                    logTypeId: LogTypeConstant.ERROR_MOVIE,
                    caption: ErrorLogConstant.ERROR_MOVIE_DELETE,
                    content: JSON.stringify(err),
                    description: `MovieId: ${movieId}`,
                    loggingDate: Date.now(),
                    status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_MOVIE_DELETE);
                return next({ result: result, log: log });
            })
    }

    // Data
    getById(req, res, next) {
        let id = req.data.movieId;
        this.movieService.getById(id)
            .then(data => {
                if (data == null) {
                    let result = new DataResult(null, false, ErrorLogConstant.ERROR_MOVIE_GET_BY_ID_NOT_FOUND);
                    return res.json(result);
                }
                req.result = new DataResult(data, true, "");
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "");
                return res.status(500).json(result);
            })
    }
    getDtoById(req, res, next) {
        let id = req.data.movieId;
        this.movieService.getDtoById(id)
            .then(data => {
                if (data == null) {
                    let result = new DataResult(null, false, ErrorLogConstant.ERROR_MOVIE_GET_BY_ID_NOT_FOUND);
                    return res.json(result);
                }
                req.result = new DataResult(data, true, "");
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "");
                return res.status(500).json(result);
            })
    }
    getAll(req, res, next) {
        this.movieService.getAll()
            .then(data => {
                req.result = new DataResult(data, true, "");
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "");
                return res.status(500).json(result);
            })
    }

    getAllDto(req, res, next) {
        this.movieService.getAllDto()
            .then(data => {
                req.result = new DataResult(data, true, "");
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "");
                return res.status(500).json(result);
            })
    }

    getAllDtoFilter(req, res, next) {
        let condition = req.data.query ? req.data.query : {};
        this.movieService.getAllDtoFilter(condition)
            .then(data => {
                req.result = new DataResult(data, true, "");
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "");
                return res.status(500).json(result);
            })
    }
}