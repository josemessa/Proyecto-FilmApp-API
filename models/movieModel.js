const mongoose= require("mongoose")



const movieSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    posterUrl:{
        type: String,
        required: false,
        default: "Movie poster not available"
    },
    adult:{
        type: Boolean,
        required: false,
        default: false,
    },
    popularity:{
        type: Number,
        required: false,
        default: 0
    },
    fecha_de_creacion:{
        type: Date,
        required: false,
        default: Date.now()
    },
    average:{
        type: Number,
        require: false,
        default: 0
    }
})

const Movie = mongoose.model('Movie', movieSchema, 'movies');
module.exports = Movie;

