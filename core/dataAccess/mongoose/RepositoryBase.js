export default class RepositoryBase {
    constructor(model) {
        this.model = model;
    }

    add(entity) {
        const modelEntity = new this.model(entity)
        return modelEntity.save();
    }

    delete(id) {
        return this.model.findByIdAndDelete(id)
    }

    update(id, entity) {
        return this.model.update({ _id: id }, entity);
    }

    getAll() {
        return this.getAllFilter();
    }

    getAllFilter(condition) {
        const promise = this.model.find(condition);
        return promise;
    }

    getById(id) {
        const promise = this.model.findById(id);
        return promise;
    }
}