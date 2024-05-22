import RepositoryBase from '../../../core/dataAccess/mongoose/RepositoryBase.js';
import Genre from '../../../model/entities/Genre.js';

export default class GenreService extends RepositoryBase {
    constructor() {
        super(Genre);
    }

    addMultiple(entityList) {
        return Genre.insertMany(entityList);
    }
}