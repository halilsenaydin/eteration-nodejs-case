import mongoConnect from '../controller/dataAccess/contexts/MongoDbContext.js';
export default class Database {
    static runMongoose() {
        mongoConnect();
    }
}