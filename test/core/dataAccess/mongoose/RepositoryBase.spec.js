import RepositoryBase from '../../../../core/dataAccess/mongoose/RepositoryBase.js';
import Genre from '../../../../model/entities/Genre.js';
import { jest } from '@jest/globals'

describe('RepositoryBase', () => {
    let repository;

    beforeEach(() => {
        repository = new RepositoryBase(Genre);
    });

    it('should add an entity', async () => {
        const entity = { name: 'test entity' };
        const saveMock = jest.spyOn(Genre.prototype, 'save').mockResolvedValue(entity);

        const result = await repository.add(entity);

        expect(saveMock).toHaveBeenCalled();
        expect(result).toEqual(entity);

        saveMock.mockRestore();
    });

    it('should delete an entity by id', async () => {
        const deleteMock = jest.spyOn(Genre, 'findByIdAndDelete').mockResolvedValue(true);
        const result = await repository.delete('some-id');

        expect(deleteMock).toHaveBeenCalledWith('some-id');
        expect(result).toBe(true);

        deleteMock.mockRestore();
    });

    it('should update an entity by id', async () => {
        const updateMock = jest.spyOn(Genre, 'update').mockResolvedValue(true);
        const entity = { name: 'updated entity' };
        const result = await repository.update('some-id', entity);

        expect(updateMock).toHaveBeenCalledWith({ _id: 'some-id' }, entity);
        expect(result).toBe(true);

        updateMock.mockRestore();
    });


    it('should get all entities', async () => {
        let mock = [{ name: 'entity1' }, { name: 'entity2' }]
        const findMock = jest.spyOn(Genre, 'find').mockResolvedValue(mock);
        const result = await repository.getAll();

        expect(findMock).toHaveBeenCalled();
        expect(result).toEqual(mock);
        findMock.mockRestore();
    });

    it('should get all entities with filter ', async () => {
        let mock = [{ name: 'entity1' }, { name: 'entity2' }]
        let filter = { name: 'entit1' }
        const findMock = jest.spyOn(Genre, 'find').mockResolvedValue(mock);
        const result = await repository.getAllFilter(filter);

        expect(findMock).toHaveBeenCalledWith(filter);
        expect(result).toBe(mock);
        findMock.mockRestore();
    });

    it('should get an entity by id', async () => {
        const findByIdMock = jest.spyOn(Genre, 'findById').mockResolvedValue('entity');
        const result = await repository.getById('some-id');

        expect(findByIdMock).toHaveBeenCalledWith('some-id');
        expect(result).toBe('entity');

        findByIdMock.mockRestore();
    });
});
