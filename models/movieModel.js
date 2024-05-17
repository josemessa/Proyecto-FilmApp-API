const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    default: "Movie poster not available",
  },
  adult: {
    type: Boolean,
    default: false,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  fecha_de_creacion: {
    type: Date,
    default: Date.now,
  },
  average: {
    type: Number,
    default: 0,
  },
});


const Movie = mongoose.model("Movie", movieSchema, "movies");
module.exports = Movie;
