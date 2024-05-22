import Result from './Result.js';

export default class DataResult extends Result {
    constructor(data, success, message) {
        super(success, message)
        this.data = data;
    }
}