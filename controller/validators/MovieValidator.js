import validator from 'validator';
import Result from '../../core/entities/Result.js';
import MovieMessageConstant from '../constants/messageConstants/MovieMessageConstant.js';
import ValidatorHelper from './ValidatorHelper.js';

export default class MovieValidator {
    constructor() { }

    static rules(language, movie) {
        const rules = [
            // Title Rules
            new Result(ValidatorHelper.isUndefined(movie.title), MovieMessageConstant.TITLE_NOT_EMPTY[language]),
            new Result(!validator.isEmpty(movie.title), MovieMessageConstant.TITLE_NOT_EMPTY[language]),

            // Popularity Rules
            new Result(ValidatorHelper.isUndefined(movie.popularity), MovieMessageConstant.POPULARITY_NOT_EMPTY[language]),
            new Result(!validator.isEmpty(movie.popularity), MovieMessageConstant.POPULARITY_NOT_EMPTY[language]),
            new Result(validator.isNumeric(movie.popularity), MovieMessageConstant.POPULARITY_NOT_NUMERIC[language]),

            // VoteAverage Rules
            new Result(ValidatorHelper.isUndefined(movie.voteAverage), MovieMessageConstant.VOTE_AVERAGE_NOT_EMPTY[language]),
            new Result(!validator.isEmpty(movie.voteAverage), MovieMessageConstant.VOTE_AVERAGE_NOT_EMPTY[language]),
            new Result(validator.isNumeric(movie.voteAverage), MovieMessageConstant.VOTE_AVERAGE_NOT_NUMERIC[language]),

            // VoteCount Rules
            new Result(ValidatorHelper.isUndefined(movie.voteCount), MovieMessageConstant.VOTE_COUNT_NOT_EMPTY[language]),
            new Result(!validator.isEmpty(movie.voteCount), MovieMessageConstant.VOTE_COUNT_NOT_EMPTY[language]),
            new Result(validator.isNumeric(movie.voteCount), MovieMessageConstant.VOTE_COUNT_NOT_NUMERIC[language]),

            // Genre Rules
            new Result(ValidatorHelper.arrayIsNotEmpty(movie.genres), MovieMessageConstant.GENRES_NOT_EMPTY[language]),

            // Title Rules
            new Result(ValidatorHelper.isUndefined(movie.releaseDate), MovieMessageConstant.RELEASE_DATE_NOT_EMPTY[language]),
            new Result(!validator.isEmpty(movie.releaseDate), MovieMessageConstant.RELEASE_DATE_NOT_EMPTY[language])
        ]
        return rules;
    }

    static run(req, res, next) {
        let language = req.data.currentLanguage;
        const movie = { popularity: String(req.data.popularity), voteAverage: String(req.data.voteAverage), voteCount: String(req.data.voteCount), genres: req.data.genres, title: String(req.data.title), releaseDate: String(req.data.releaseDate) };
        const rules = MovieValidator.rules(language, movie);
        let result;
        for (let index = 0; index < rules.length; index++) {
            result = rules[index];
            if (!result.status) {
                return res.status(400).json(result);
            }
        }
        req.result = new Result(true, MovieMessageConstant.VALIDATE_MOVIE[language]);
        return next();
    }

    static validateObjectId(req, res, next) {
        let language = req.data.currentLanguage;
        let objectId = req.data.movieId;
        let isObjectId = ValidatorHelper.isObjectId(objectId);
        if (isObjectId) {
            return next();
        }
        let result = new Result(false, MovieMessageConstant.UNVALIDATE_OBJECT_ID[language]);
        return res.status(400).json(result);
    }
}