import request from 'supertest';
import app from '../../app.js';
import MovieMessageConstant from '../../controller/constants/messageConstants/MovieMessageConstant.js';
import SuccessLogConstant from '../../controller/constants/logConstants/SuccessLogConstant.js';
import ErrorLogConstant from '../../controller/constants/logConstants/ErrorLogConstant.js';

describe('/v1/movie', () => {
    it('GET /movies should return all movies', async () => {
        const res = await request(app).get('/v1/movie/movies');
        expect(res.statusCode).toEqual(200);
    });
    it('GET /movies-dto should return all movies dto', async () => {
        const res = await request(app).get('/v1/movie/movies-dto');
        expect(res.statusCode).toEqual(200);
    });
    it('GET /movies/filter should return movies with filter', async () => {
        let filter = "?title=Movie";
        const res = await request(app).get(`/v1/movie/movies-dto/filter/${filter}`);
        expect(res.statusCode).toEqual(200);
    });
    it('GET /movies/{movieId} should return a movie by id', async () => {
        let movieId = "664d8e1d7cd2cd8138028e91";
        const res = await request(app).get(`/v1/movie/movies/${movieId}`);
        expect(res.statusCode).toEqual(200);
    });
    it('GET /movies/{movieId} should return failed, movieId unvalid', async () => {
        let movieId = "12";
        const res = await request(app).get(`/v1/movie/movies/${movieId}`);
        expect(res.statusCode).toEqual(400);
    });
    it('GET /movies/{movieId} should return failed, movieId not found', async () => {
        let movieId = "664d8700d6af6df1d4291c10";
        const res = await request(app).get(`/v1/movie/movies/${movieId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: false, data: null, message: ErrorLogConstant.ERROR_MOVIE_GET_BY_ID_NOT_FOUND });
    });
    it('GET /movies-dto/{movieId} should return a movie dto by id', async () => {
        let movieId = "664d8e1d7cd2cd8138028e91";
        const res = await request(app).get(`/v1/movie/movies-dto/${movieId}`);
        expect(res.statusCode).toEqual(200);
    });
    it('GET /pull-tmdb-datas should return successful', async () => {
        const res = await request(app).get(`/v1/movie/pull-tmdb-datas`);
        expect(res.statusCode).toEqual(200);
    });

    it('POST /add should return successful', async () => {
        const res = await request(app)
            .post('/v1/movie/add')
            .send({
                title: 'Movie Name 23',
                popularity: 10.2,
                overview: '',
                voteAverage: 1.1,
                voteCount: 2,
                releaseDate: '2024-03-27',
                genres: ['664d8705d6af6df1d4291c15', '664d8705d6af6df1d4291c23']
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: true, message: SuccessLogConstant.SUCCESS_MOVIE_ADD });
    });
    it('POST /add should return failed, throw err', async () => {
        const res = await request(app)
            .post('/v1/movie/add')
            .send({
                title: "Mo",
                overview: "the best movie!",
                popularity: 7832.06,
                voteAverage: 9.8,
                voteCount: 1903,
                releaseDate: "2024-05-19",
                genres: [
                    "664d8705d6af6dc1d4291c13",
                    1
                ]
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ status: false, message: ErrorLogConstant.ERROR_MOVIE_ADD });
    });
    it('POST /add should return failed, props is undefined', async () => {
        const res = await request(app)
            .post('/v1/movie/add')
            .send({});

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ status: false, message: MovieMessageConstant.TITLE_NOT_EMPTY[1] });
    });
    it('POST /add should return failed, title is empty', async () => {
        const res = await request(app)
            .post('/v1/movie/add')
            .send({ title: '' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ status: false, message: MovieMessageConstant.TITLE_NOT_EMPTY[1] });
    });

    it('POST /delete should return failed, movieId not found', async () => {
        const res = await request(app)
            .post('/v1/movie/delete')
            .send({ movieId: '664d8705d6af6df1d4291c15' });

        expect(res.statusCode).toEqual(202);
        expect(res.body).toEqual({ status: false, message: ErrorLogConstant.ERROR_MOVIE_DELETE_NOT_FOUND_MOVIE });
    });
    it('POST /delete should return failed, movieId unvalidate', async () => {
        const res = await request(app)
            .post('/v1/movie/delete')
            .send({ movieId: '604d89705d6af6df1d4291c15' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ status: false, message: MovieMessageConstant.UNVALIDATE_OBJECT_ID[1] });
    });
    it('POST /delete should return failed, throw error', async () => {
        const res = await request(app)
            .post('/v1/movie/delete')
            .send({ movieId: '664d7b94341868eb5612d2ve' });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ status: false, message: ErrorLogConstant.ERROR_MOVIE_DELETE });
    });
});