import validator from 'validator';
import Result from '../../core/entities/Result.js';
import GenreMessageConstant from '../constants/messageConstants/GenreMessageConstant.js';
import ValidatorHelper from './ValidatorHelper.js';

export default class GenreValidator {
    constructor() { }

    static rules(language, genre) {
        const rules = [
            // Name Rules
            new Result(ValidatorHelper.isUndefined(genre.name), GenreMessageConstant.NAME_NOT_EMPTY[language]),
            new Result(!validator.isEmpty(genre.name), GenreMessageConstant.NAME_NOT_EMPTY[language])
        ]
        return rules;
    }

    static run(req, res, next) {
        let language = req.data.currentLanguage;
        const genre = { name: String(req.data.name) };
        const rules = GenreValidator.rules(language, genre);
        let result;
        for (let index = 0; index < rules.length; index++) {
            result = rules[index];
            if (!result.status) {
                return res.json(result);
            }
        }
        req.result = new Result(true, GenreMessageConstant.VALIDATE_GENRE);
        return next();
    }

    static validateObjectId(req, res, next) {
        let language = req.data.currentLanguage;
        let objectId = req.data.genreId;
        let isObjectId = ValidatorHelper.isObjectId(objectId);
        if (isObjectId) {
            return next();
        }
        let result = new Result(false, GenreMessageConstant.UNVALIDATE_OBJECT_ID[language]);
        return res.json(result);
    }
}