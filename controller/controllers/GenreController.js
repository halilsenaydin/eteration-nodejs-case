import ErrorLogConstant from "../constants/logConstants/ErrorLogConstant.js";
import LogTypeConstant from "../constants/logConstants/LogTypeConstant.js";
import GenreService from "../dataAccess/services/GenreService.js";
import SuccessLogConstant from "../constants/logConstants/SuccessLogConstant.js";
import Result from '../../core/entities/Result.js';
import DataResult from '../../core/entities/DataResult.js';

export default class GenreController {
    constructor({ genreService }) {
        this.genreService = genreService;
    }

    add(req, res, next) {
        let entity = {
            name: req.data.genreName
        }
        this.genreService.add(entity)
            .then(succ => {
                req.result = new Result(true, SuccessLogConstant.SUCCESS_GENRE_ADD);
                return next();
            })
            .catch(err => {
                const log = {
                    logTypeId: LogTypeConstant.ERROR_GENRE,
                    caption: ErrorLogConstant.ERROR_GENRE_ADD,
                    content: JSON.stringify(err),
                    description: JSON.stringify(entity),
                    loggingDate: Date.now(),
                    status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_GENRE_ADD);
                req.result = result;
                return next({ result: result, log: log });
            });
    }
    addMultiple(req, res, next) {
        let genres = req.data.genres;
        this.genreService.addMultiple(genres)
            .then(succ => {
                req.result = new Result(true, SuccessLogConstant.SUCCESS_GENRE_ADD_MULTIPLE);
                return next();
            })
            .catch(err => {
                const log = {
                    logTypeId: LogTypeConstant.ERROR_GENRE,
                    caption: ErrorLogConstant.ERROR_GENRE_ADD_MULTIPLE,
                    content: JSON.stringify(err),
                    description: JSON.stringify(genres),
                    loggingDate: Date.now(),
                    status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_GENRE_ADD_MULTIPLE);
                return next({ result: result, log: log });
            });
    }
    destroy(req, res, next) {
        const genreId = req.data.genreId;
        this.genreService.delete(genreId)
            .then(result => {
                if (result == null) {
                    let result = new Result(false, ErrorLogConstant.ERROR_GENRE_DELETE_NOT_FOUND_GENRE);
                    return res.status(202).json(result);
                }
                req.result = new Result(true, SuccessLogConstant.SUCCESS_GENRE_DELETE);
                return next();
            })
            .catch(err => {
                const log = {
                    logTypeId: LogTypeConstant.ERROR_GENRE,
                    caption: ErrorLogConstant.ERROR_GENRE_DELETE,
                    content: JSON.stringify(err),
                    description: `GenreId: ${genreId}`,
                    loggingDate: Date.now(),
                    status: false
                };
                var result = new Result(false, ErrorLogConstant.ERROR_GENRE_DELETE);
                return res.status(500).json(result);
            })
    }

    // Data
    getAllFilter(req, res, next) {
        let query = req.data.query;
        this.genreService.getAllFilter(query)
            .then(data => {
                req.data.genres = data;
                req.result = new DataResult(data, true, "");
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "");
                return res.status(500).json(result);
            })
    }
    getById(req, res, next) {
        let id = req.data.genreId;
        this.genreService.getById(id)
            .then(data => {
                if (data == null) {
                    let result = new DataResult(null, false, ErrorLogConstant.ERROR_GENRE_GET_BY_ID_NOT_FOUND);
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
        this.genreService.getAll()
            .then(data => {
                req.data.genres = data;
                req.result = new DataResult(data, true, "");
                return next();
            })
            .catch(err => {
                var result = new DataResult({}, false, "");
                return res.status(500).json(result);
            })
    }
}