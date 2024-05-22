export default class ValidatorHelper {
    constructor() { }

    static isUndefined(text) {
        if (text == undefined || text == 'undefined') {
            return false;
        }
        return true;
    }

    static arrayIsNotEmpty(array) {
        if (array == undefined || array.length == 0) {
            return false;
        }
        return true;
    }
}