import Mongoose from 'mongoose';
import ModelConstant from '../../controller/constants/apiConstants/ModelConstant.js';

const User = Mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    userName: { type: string, required: true },
    email: { type: string, required: true },
    createdDate: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
});

export default Mongoose.model(ModelConstant.USER, User)