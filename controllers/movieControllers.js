const Movie = require("../models/movieModel");

const addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      posterUrl,
      adult,          
    } = req.body;
    const movie = new Movie({
      title: title,
      description: description,
      posterUrl: posterUrl,
      adult: adult,
         });
    await movie.save();
    res.status(200).json({
      status: "movie created succesfully",
      data: movie,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "movie not added",
      error: error.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (movies.length === 0) {
      return res.status(204).json({
        status: "success",
        message: "no existen movies en la base de datos",
      });
    } else {
      return res.status(200).json({
        status: "sucess",
        data: movies,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "movies not founded",
      error: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(204).json({
        status: "success",
        message: "no existen movie con ese ID",
      });
    }
    return res.status(200).json({
      status: "sucess",
      data: movie,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "movie not found",
      error: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, description, posterUrl, adult, popularity, average } =
      req.body;

    const movie = await Movie.findByIdAndUpdate(movieId, {
      $set: { title, description, posterUrl, adult, popularity, average },
    });
    if (!movie) {
      return res.status(204).json({
        status: "success",
        message: "no existen movie con ese ID",
      });
    }
    return res.status(200).json({
      status: "movie updated",
      data: movie,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "movie not updated",
      error: error.message,
    });
  }
};

const getLatestMovies = async (req, res) => {
  try {
    const latestMovies = await Movie.find()
      .sort({ fecha_de_creacion: -1 })
      .limit(10);
    if (!latestMovies) {
      return res.status(204).json({
        status: "success",
        message: "no existen movies",
      });
    }
    return res.status(200).json({
      status: "success getting latest movies",
      data: latestMovies,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "latest movies not found",
      error: error.message,
    });
  }
};

const deleteMovie= async (req,res)=>{
  try {
    const movieToDelete=req.params.id
    if(!movieToDelete){
      return res.status(204).json({
        status: "success",
        message: "movie not found"
      });
    }
    Movie.findByIdAndDelete(movieToDelete)
    return res.status(200).json({
      status:"sucess",
      message: "movie deleted succesfully"
    })
    
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "movie not deleted",
      error: error.message,
    });
  }
}
module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  getLatestMovies,
  deleteMovie
};
