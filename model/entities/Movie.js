import Mongoose from 'mongoose';
import ModelConstant from '../../controller/constants/apiConstants/ModelConstant.js';

const Movie = Mongoose.Schema({
    id: { type: String, required: false },
    title: { type: String, required: true },
    overview: { type: String, required: false },
    popularity: { type: Number, required: true },
    voteAverage: { type: Number, required: true },
    voteCount: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    genres: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: ModelConstant.GENRE
    }],
});

export default Mongoose.model(ModelConstant.MOVIE, Movie)