const Movie = require("../models/movieModel");

const addMovie= async (req, res) =>{
    try {
        const { title, description, posterUrl, adult , popularity, fecha_de_creacion,average} = req.body;
        const movie = new Movie({
          title: title,
          description: description,
          posterUrl: posterUrl,
          adult: adult,
          popularity: popularity,
          fecha_de_creacion: fecha_de_creacion,
          average: average
        })  
       await movie.save()       
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
}

module.exports={addMovie}