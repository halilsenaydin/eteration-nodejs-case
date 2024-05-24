import Mongoose from 'mongoose';
import CongifurationConstant from '../../constants/apiConstants/CongifurationConstant.js';

const mongoConnect = () => {
    Mongoose.connect(CongifurationConstant.MONGO_DB_CONNECTION_STRING)
        .then(() => {
            console.log('Mongoose Connected');
        })
        .catch(err => {
        })
}

export default mongoConnect;