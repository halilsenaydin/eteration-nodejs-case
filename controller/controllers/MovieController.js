import ErrorLogConstant from "../constants/logConstants/ErrorLogConstant.js";
import LogTypeConstant from "../constants/logConstants/LogTypeConstant.js";
import MovieService from "../dataAccess/services/MovieService.js";
import SuccessLogConstant from "../constants/logConstants/successLogConstant.js";
import Result from '../../core/entities/Result.js';
import DataResult from '../../core/entities/DataResult.js';

const movieDal = new MovieService();
export default class Movie {
    constructor() { }

    static add(req, res, next) {
        let entity = {
            title: req.data.title,
            popularity: req.data.popularity,
            overview: req.data.overview,
            voteAverage: req.data.voteAverage,
            voteCount: req.data.voteCount,
            releaseDate: req.data.releaseDate,
            genres: req.data.genres
        }
        movieDal.add(entity)
            .then(succ => {
                req.result = new Result(true, SuccessLogConstant.SUCCESS_MOVIE_ADD)
                return next();
            })
            .catch(err => {
                const log = {
                    LogTypeId: LogTypeConstant.ERROR_MOVIE,
                    Caption: ErrorLogConstant.ERROR_MOVIE_ADD,
                    Content: JSON.stringify(err),
                    Description: JSON.stringify(entity),
                    LoggingDate: Date.now(),
                    Status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_MOVIE_ADD)
                return next({ result: result, log: log });
            });
    }
    static addMultiple(req, res, next) {
        let movies = req.data.movies;
        movieDal.addMultiple(movies)
            .then(succ => {
                req.result = new Result(true, SuccessLogConstant.SUCCESS_MOVIE_ADD)
                return next();
            })
            .catch(err => {
                const log = {
                    LogTypeId: LogTypeConstant.ERROR_MOVIE,
                    Caption: ErrorLogConstant.ERROR_MOVIE_ADD,
                    Content: JSON.stringify(err),
                    Description: JSON.stringify(movies),
                    LoggingDate: Date.now(),
                    Status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_MOVIE_ADD)
                return next({ result: result, log: log });
            });
    }
    static destroy(req, res, next) {
        const movieId = req.data.movieId;
        movieDal.delete(movieId)
            .then(result => {
                if (result == null) {
                    req.result = new Result(false, ErrorLogConstant.ERROR_MOVIE_DELETE_NOT_FOUND_MOVIE)
                } else {
                    req.result = new Result(true, SuccessLogConstant.SUCCESS_MOVIE_DELETE)
                }
                return next();
            })
            .catch(err => {
                const log = {
                    LogTypeId: LogTypeConstant.ERROR_MOVIE,
                    Caption: ErrorLogConstant.ERROR_MOVIE_DELETE,
                    Content: JSON.stringify(err),
                    Description: `MovieId: ${movieId}`,
                    LoggingDate: Date.now(),
                    Status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_MOVIE_DELETE)
                return next({ result: result, log: log });
            })
    }

    // Data
    static getById(req, res, next) {
        let id = req.data.movieId;
        movieDal.getById(id)
            .then(data => {
                req.result = new DataResult(data, true, "")
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "")
                return res.json(result)
            })
    }
    static getDtoById(req, res, next) {
        let id = req.data.movieId;
        movieDal.getDtoById(id)
            .then(data => {
                req.result = new DataResult(data, true, "");
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "")
                return res.json(result)
            })
    }
    static getAll(req, res, next) {
        movieDal.getAll()
            .then(data => {
                req.data.movies = data;
                req.result = new DataResult(data, true, "")
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "")
                return res.json(result)
            })
    }
    static getAllDto(req, res, next) {
        movieDal.getAlDto()
            .then(data => {
                req.result = new DataResult(data, true, "")
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "")
                return res.json(result)
            })
    }
}