import { asClass, createContainer } from 'awilix'
import GenreService from '../controller/dataAccess/services/GenreService.js'
import MovieService from '../controller/dataAccess/services/MovieService.js'
import GenreController from '../controller/controllers/GenreController.js';
import MovieController from '../controller/controllers/MovieController.js';

export default class Container {
    static container = createContainer()
        .register({
            genreService: asClass(GenreService).singleton(),
            genreController: asClass(GenreController).singleton(),

            movieService: asClass(MovieService).singleton(),
            movieController: asClass(MovieController).singleton(),
        })

    static genreController = Container.container.resolve('genreController');
    static movieController = Container.container.resolve('movieController');
}