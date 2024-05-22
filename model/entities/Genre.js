import Mongoose from 'mongoose';
import ModelConstant from '../../controller/constants/apiConstants/ModelConstant.js';

const Genre = Mongoose.Schema({
    id: { type: String, required: false },
    name: { type: String, required: true }
});

export default Mongoose.model(ModelConstant.GENRE, Genre)