import MovieService from '../../../../controller/dataAccess/services/MovieService.js';
import Movie from '../../../../model/entities/Movie.js';
import { jest } from '@jest/globals'

describe('MovieService', () => {
    let repository;

    beforeEach(() => {
        repository = new MovieService();
    });

    it('should add an entity', async () => {
        let entity = {
            title: 'test title',
            popularity: 10.1,
            overview: 'test overview',
            voteAverage: 5.4,
            voteCount: 1000,
            releaseDate: '2024-07-06',
            genres: ['some-id-1', 'some-id-2']
        };
        const saveMock = jest.spyOn(Movie.prototype, 'save').mockResolvedValue(entity);

        const result = await repository.add(entity);
        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(entity);
        saveMock.mockRestore();
    });

    it('should add multiple entity', async () => {
        const entities = [
            {
                title: 'test title 1',
                popularity: 10.1,
                overview: 'test overview 1',
                voteAverage: 5.4,
                voteCount: 1000,
                releaseDate: '2024-07-06',
                genres: ['some-id-1', 'some-id-2']
            },
            {
                title: 'test title 2',
                popularity: 10.2,
                overview: 'test overview 2',
                voteAverage: 5.5,
                voteCount: 1001,
                releaseDate: '2024-07-07',
                genres: ['some-id-3', 'some-id-4']
            }
        ];
        const insertManyMock = jest.spyOn(Movie, 'insertMany').mockResolvedValue(entities);

        const result = await repository.addMultiple(entities);

        expect(insertManyMock).toHaveBeenCalledWith(entities);
        expect(result).toEqual(entities);
        insertManyMock.mockRestore();
    });

    it('should return entity delete an entity by id', async () => {
        let mock = { id: "new ObjectId('some-id')" }
        const deleteMock = jest.spyOn(Movie, 'findByIdAndDelete').mockResolvedValue(mock);
        const result = await repository.delete('some-id');

        expect(deleteMock).toHaveBeenCalledWith('some-id');
        expect(result).toBe(mock);
        deleteMock.mockRestore();
    });

    it('should get all entities', async () => {
        const mock = [
            {
                _id: "_id1",
                id: "id1",
                title: 'test title 1',
                popularity: 10.1,
                overview: 'test overview 1',
                voteAverage: 5.4,
                voteCount: 1000,
                releaseDate: '2024-07-06',
                genres: ['some-id-1', 'some-id-2']
            },
            {
                _id: "_id2",
                id: "id2",
                title: 'test title 2',
                popularity: 10.2,
                overview: 'test overview 2',
                voteAverage: 5.5,
                voteCount: 1001,
                releaseDate: '2024-07-07',
                genres: ['some-id-3', 'some-id-4']
            }
        ];
        const findMock = jest.spyOn(Movie, 'find').mockResolvedValue(mock);
        const result = await repository.getAll();

        expect(findMock).toHaveBeenCalled();
        expect(result).toEqual(mock);

        findMock.mockRestore();
    });

    it('should get an entity by id', async () => {
        let mock = {
            _id: "_id1",
            id: "id1",
            title: 'test title 1',
            popularity: 10.1,
            overview: 'test overview 1',
            voteAverage: 5.4,
            voteCount: 1000,
            releaseDate: '2024-07-06',
            genres: ['some-id-1', 'some-id-2']
        }
        const findByIdMock = jest.spyOn(Movie, 'findById').mockResolvedValue(mock);
        const result = await repository.getById('some-id');

        expect(findByIdMock).toHaveBeenCalledWith('some-id');
        expect(result).toEqual(mock);

        findByIdMock.mockRestore();
    });

    it('should get all dtos', async () => {
        const mock = [
            {
                _id: "_id1",
                id: "id1",
                title: 'test title 1',
                popularity: 10.1,
                overview: 'test overview 1',
                voteAverage: 5.4,
                voteCount: 1000,
                releaseDate: '2024-07-06',
                genres: [{ _id: "_id1", id: "id1", name: "entity1" }, { _id: "_id2", id: "id2", name: "entity2" }]
            },
            {
                _id: "_id2",
                id: "id2",
                title: 'test title 2',
                popularity: 10.2,
                overview: 'test overview 2',
                voteAverage: 5.5,
                voteCount: 1001,
                releaseDate: '2024-07-07',
                genres: [{ _id: "_id3", id: "id4", name: "entity2" }, { _id: "_id3", id: "id3", name: "entity3" }]
            }
        ];
        const findMock = jest.spyOn(Movie, 'find').mockReturnValue({ populate: jest.fn().mockResolvedValue(mock) });
        const result = await repository.getAllDto();

        expect(findMock).toHaveBeenCalled();
        expect(result).toEqual(mock);
        findMock.mockRestore();
    });

    it('should get all dto with filter', async () => {
        const mock = [
            {
                _id: "_id1",
                id: "id1",
                title: 'test title 1',
                popularity: 10.1,
                overview: 'test overview 1',
                voteAverage: 5.4,
                voteCount: 1000,
                releaseDate: '2024-07-06',
                genres: [{ _id: "_id1", id: "id1", name: "entity1" }, { _id: "_id2", id: "id2", name: "entity2" }]
            },
            {
                _id: "_id2",
                id: "id2",
                title: 'test title 2',
                popularity: 10.2,
                overview: 'test overview 2',
                voteAverage: 5.5,
                voteCount: 1001,
                releaseDate: '2024-07-07',
                genres: [{ _id: "_id3", id: "id4", name: "entity2" }, { _id: "_id3", id: "id3", name: "entity3" }]
            }
        ];
        let filter = {
            title: 'test title 1',
            popularity: 10.1,
            overview: 'test overview 1'
        };
        const findByIdMock = jest.spyOn(Movie, 'find').mockReturnValue({ populate: jest.fn().mockResolvedValue(mock) });
        const result = await repository.getAllDtoFilter(filter);

        expect(findByIdMock).toHaveBeenCalledWith(filter);
        expect(result).toEqual(mock);
        findByIdMock.mockRestore();
    });

    it('should get an dto by id', async () => {
        let mock = {
            _id: "_id1",
            id: "id1",
            title: 'test title 1',
            popularity: 10.1,
            overview: 'test overview 1',
            voteAverage: 5.4,
            voteCount: 1000,
            releaseDate: '2024-07-06',
            genres: [{ _id: "_id1", id: "id1", name: "entity1" }, { _id: "_id2", id: "id2", name: "entity2" }]
        }
        const findByIdMock = jest.spyOn(Movie, 'findById').mockReturnValue({ populate: jest.fn().mockResolvedValue(mock) });

        const result = await repository.getDtoById('some-id');

        expect(findByIdMock).toHaveBeenCalledWith('some-id');
        expect(result).toEqual(mock);
        findByIdMock.mockRestore();
    });
});
