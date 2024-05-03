const router = require("express").Router();
const{addMovie, getAllMovies, getMovieById, updateMovie, getLatestMovies, deleteMovie}= require("../controllers/movieControllers");
const {verifyToken, verifyAdmin} = require("../middlewares/auth");

router.post("/", verifyToken, verifyAdmin, addMovie);
router.get("/",getAllMovies)
router.get("/latest", getLatestMovies)
router.get("/:id", getMovieById)
router.patch("/:id", verifyToken, verifyAdmin, updateMovie)
router.delete("/:id/deletemovie", verifyToken, verifyAdmin, deleteMovie)

module.exports = router;
