import ErrorLogConstant from "../constants/logConstants/ErrorLogConstant.js";
import LogTypeConstant from "../constants/logConstants/LogTypeConstant.js";
import GenreService from "../dataAccess/services/GenreService.js";
import SuccessLogConstant from "../constants/logConstants/successLogConstant.js";
import Result from '../../core/entities/Result.js';
import DataResult from '../../core/entities/DataResult.js';

const genreDal = new GenreService();
export default class Genre {
    constructor() { }

    static add(req, res, next) {
        let entity = {
            name: req.data.genreName
        }
        genreDal.add(entity)
            .then(succ => {
                req.result = new Result(true, SuccessLogConstant.SUCCESS_GENRE_ADD)
                return next();
            })
            .catch(err => {
                const log = {
                    LogTypeId: LogTypeConstant.ERROR_GENRE,
                    Caption: ErrorLogConstant.ERROR_GENRE_ADD,
                    Content: JSON.stringify(err),
                    Description: JSON.stringify(entity),
                    LoggingDate: Date.now(),
                    Status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_GENRE_ADD)
                return next({ result: result, log: log });
            });
    }
    static addMultiple(req, res, next) {
        let genres = req.data.genres;
        genreDal.addMultiple(genres)
            .then(succ => {
                req.result = new Result(true, SuccessLogConstant.SUCCESS_GENRE_ADD_MULTIPLE)
                return next();
            })
            .catch(err => {
                const log = {
                    LogTypeId: LogTypeConstant.ERROR_GENRE,
                    Caption: ErrorLogConstant.ERROR_GENRE_ADD_MULTIPLE,
                    Content: JSON.stringify(err),
                    Description: JSON.stringify(genres),
                    LoggingDate: Date.now(),
                    Status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_GENRE_ADD_MULTIPLE)
                return next({ result: result, log: log });
            });
    }
    static destroy(req, res, next) {
        const genreId = req.data.genreId;
        genreDal.delete(genreId)
            .then(result => {
                if (result == null) {
                    req.result = new Result(false, ErrorLogConstant.ERROR_GENRE_DELETE_NOT_FOUND_GENRE)
                } else {
                    req.result = new Result(true, SuccessLogConstant.SUCCESS_GENRE_DELETE)
                }
                return next();
            })
            .catch(err => {
                const log = {
                    LogTypeId: LogTypeConstant.ERROR_GENRE,
                    Caption: ErrorLogConstant.ERROR_GENRE_DELETE,
                    Content: JSON.stringify(err),
                    Description: `GenreId: ${genreId}`,
                    LoggingDate: Date.now(),
                    Status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_GENRE_DELETE)
                return next({ result: result, log: log });
            })
    }

    // Data
    static getById(req, res, next) {
        let id = req.data.genreId;
        genreDal.getById(id)
            .then(data => {
                if (data == null) {
                    req.result = new DataResult(data, false, ErrorLogConstant.ERROR_GENRE_GET_BY_ID_NOT_FOUND);
                } else {
                    req.result = new DataResult(data, true, "");
                }
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "")
                return res.json(result)
            })
    }
    static getAll(req, res, next) {
        genreDal.getAll()
            .then(data => {
                req.data.genres = data
                req.result = new DataResult(data, true, "")
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "")
                return res.json(result)
            })
    }

}