import request from 'request';
import CongifurationConstant from '../constants/apiConstants/CongifurationConstant.js';
import Result from '../../core/entities/Result.js';
import DataResult from '../../core/entities/DataResult.js';

export default class TMDB {
    static getAllMovies(req, res, next) {
        request(`${CongifurationConstant.TMDB_ROOT}/discover/movie?sort_by: release_date.asc?vote_count_gte: 1500?vote_average_gte: 8.4?watch_provider_id: 8?watch_region: TR?&api_key=${CongifurationConstant.TMDB_API_KEY}`, function (error, rensponse, body) {
            let movies = JSON.parse(body).results;
            req.data.newMovies = movies;
            req.result = new DataResult(movies, true, "");
            next();
        });
    }
    static getAllMovieGenres(req, res, next) {
        let genreType = req.data.genreType;
        request(`${CongifurationConstant.TMDB_ROOT}/genre/${genreType}/list?&api_key=${CongifurationConstant.TMDB_API_KEY}`, function (error, rensponse, body) {
            let genres = JSON.parse(body).genres;
            req.data.newGenres = req.data.newGenres.concat(genres);
            req.result = new DataResult(req.data.newGenres, true, "");
            next();
        });
    }
    static filterExistGenres(req, res, next) {
        let genres = req.data.genres;
        let newGenres = req.data.newGenres;
        const genreList = newGenres.filter(newGenre =>
            !genres.some(genre => Number(genre.id) === newGenre.id)
        );
        req.data.genres = genreList;
        req.result = new DataResult(genreList, true, "");
        next();
    }
    static filterExistMovies(req, res, next) {
        let movies = req.data.movies;
        let newMovies = req.data.newMovies;
        const movieList = newMovies.filter(newMovie =>
            !movies.some(movie => Number(movie.id) === newMovie.id)
        );
        req.data.movies = movieList;
        req.result = new DataResult(movieList, true, "");
        next();
    }
    static convertToModel(req, res, next) {
        let movies = req.data.movies;
        let genres = req.data.genres;
        let movieList = [];
        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            const genreList = genres.filter(genre => movie.genre_ids.includes(Number(genre.id))).map(genre => genre._id);
            let entityMovie = {
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                popularity: movie.popularity,
                voteAverage: movie.vote_average,
                voteCount: movie.vote_count,
                releaseDate: movie.release_date,
                genres: genreList
            }
            movieList.push(entityMovie);
        }
        req.data.movies = movieList;
        req.result = new DataResult(movieList, true, "");
        next();
    }
}