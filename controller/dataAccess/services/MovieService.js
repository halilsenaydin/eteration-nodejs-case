import RepositoryBase from '../../../core/dataAccess/mongoose/RepositoryBase.js';
import Movie from '../../../model/entities/Movie.js';

export default class MovieService extends RepositoryBase {
    constructor() {
        super(Movie);
    }

    addMultiple(entityList) {
        return Movie.insertMany(entityList);
    }

    getAllDto() {
        const promise = this.model
            .find()
            .populate("genres");
        return promise;
    }
    getDtoById(id) {
        const promise = this.model
            .findById(id)
            .populate("genres");
        return promise;
    }
}