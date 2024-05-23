import GenreService from '../../../../controller/dataAccess/services/GenreService.js';
import Genre from '../../../../model/entities/Genre.js';
import { jest } from '@jest/globals'

describe('GenreService', () => {
    let repository;

    beforeEach(() => {
        repository = new GenreService();
    });

    it('should add an entity', async () => {
        let entity = { name: 'test entity' };
        const saveMock = jest.spyOn(Genre.prototype, 'save').mockResolvedValue(entity);

        const result = await repository.add(entity);
        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(entity);
        saveMock.mockRestore();
    });

    it('should add multiple entity', async () => {
        const entities = [{ name: 'test entity 1' }, { name: 'test entity 2' }];
        const insertManyMock = jest.spyOn(Genre, 'insertMany').mockResolvedValue(entities);

        const result = await repository.addMultiple(entities);

        expect(insertManyMock).toHaveBeenCalledWith(entities);
        expect(result).toEqual(entities);

        insertManyMock.mockRestore();
    });

    it('should return entity delete an entity by id', async () => {
        let mock = { id: "new ObjectId('some-id')" }
        const deleteMock = jest.spyOn(Genre, 'findByIdAndDelete').mockResolvedValue(mock);
        const result = await repository.delete('some-id');

        expect(deleteMock).toHaveBeenCalledWith('some-id');
        expect(result).toBe(mock);

        deleteMock.mockRestore();
    });

    it('should get all entities', async () => {
        let mock = [{ _id: "_id1", id: "id1", name: "entity1" }, { _id: "_id2", id: "id2", name: "entity2" }]
        const findMock = jest.spyOn(Genre, 'find').mockResolvedValue(mock);
        const result = await repository.getAll();

        expect(findMock).toHaveBeenCalled();
        expect(result).toEqual(mock);

        findMock.mockRestore();
    });

    it('should get an entity by id', async () => {
        let mock = { _id: "_id1", id: "id1", name: "entity1" }
        const findByIdMock = jest.spyOn(Genre, 'findById').mockResolvedValue(mock);
        const result = await repository.getById('some-id');

        expect(findByIdMock).toHaveBeenCalledWith('some-id');
        expect(result).toEqual(mock);

        findByIdMock.mockRestore();
    });
});
