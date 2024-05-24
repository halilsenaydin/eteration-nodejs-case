import request from 'supertest';
import app from '../../app.js';
import GenreMessageConstant from '../../controller/constants/messageConstants/GenreMessageConstant.js';
import SuccessLogConstant from '../../controller/constants/logConstants/SuccessLogConstant.js';
import ErrorLogConstant from '../../controller/constants/logConstants/ErrorLogConstant.js';

describe('/v1/not-found-page', () => {
    it('GET /not-found-page', async () => {
        const res = await request(app).get('/v1/not-found-page');
        expect(res.statusCode).toEqual(404);
    });
});

describe('/v1/genre', () => {
    it('GET /genres should return all genres', async () => {
        const res = await request(app).get('/v1/genre/genres');
        expect(res.statusCode).toEqual(200);
    });
    it('GET /genres/filter should return a genres with filter', async () => {
        let filter = "?name=Genre";
        const res = await request(app).get(`/v1/genre/genres/filter/${filter}`);
        expect(res.statusCode).toEqual(200);
    });
    it('GET /genres/{genreId} should return a genre by id', async () => {
        let genreId = "664d8705d6af6df1d4291c1a";
        const res = await request(app).get(`/v1/genre/genres/${genreId}`);
        expect(res.statusCode).toEqual(200);
    });
    it('GET /genres/{genreId} should return failed, genreId unvalid', async () => {
        let genreId = "12";
        const res = await request(app).get(`/v1/genre/genres/${genreId}`);
        expect(res.statusCode).toEqual(400);
    });
    it('GET /genres/{genreId} should return failed, genreId not found', async () => {
        let genreId = "664d8700d6af6df1d4291c10";
        const res = await request(app).get(`/v1/genre/genres/${genreId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: false, data: null, message: ErrorLogConstant.ERROR_GENRE_GET_BY_ID_NOT_FOUND });
    });
    it('GET /pull-tmdb-datas should return successful', async () => {
        const res = await request(app).get(`/v1/genre/pull-tmdb-datas`);
        expect(res.statusCode).toEqual(200);
    });

    it('POST /add should return successful', async () => {
        const res = await request(app)
            .post('/v1/genre/add')
            .send({ name: 'Genre Name 23' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ status: true, message: SuccessLogConstant.SUCCESS_GENRE_ADD });
    });
    it('POST /add should return failed, throw err', async () => {
        const res = await request(app)
            .post('/v1/genre/add')
            .send({ name: null });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ status: false, message: ErrorLogConstant.ERROR_GENRE_ADD });
    });
    it('POST /add should return failed, name is undefined', async () => {
        const res = await request(app)
            .post('/v1/genre/add')
            .send({});

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ status: false, message: GenreMessageConstant.NAME_NOT_EMPTY[1] });
    });
    it('POST /add should return failed, name is empty', async () => {
        const res = await request(app)
            .post('/v1/genre/add')
            .send({ name: '' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ status: false, message: GenreMessageConstant.NAME_NOT_EMPTY[1] });
    });

    it('POST /delete should return failed, genreId not found', async () => {
        const res = await request(app)
            .post('/v1/genre/delete')
            .send({ genreId: '664d8705d6af6df1d4291c15' });

        expect(res.statusCode).toEqual(202);
        expect(res.body).toEqual({ status: false, message: ErrorLogConstant.ERROR_GENRE_DELETE_NOT_FOUND_GENRE });
    });
    it('POST /delete should return failed, genreId unvalidate', async () => {
        const res = await request(app)
            .post('/v1/genre/delete')
            .send({ genreId: '604d89705d6af6df1d4291c15' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ status: false, message: GenreMessageConstant.UNVALIDATE_OBJECT_ID[1] });
    });
    it('POST /delete should return failed, throw error', async () => {
        const res = await request(app)
            .post('/v1/genre/delete')
            .send({ genreId: '664d7b94341868eb5612d2ve' });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ status: false, message: ErrorLogConstant.ERROR_GENRE_DELETE });
    });
});