const router = require("express").Router();
const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  getLatestMovies,
  deleteMovie,
} = require("../controllers/movieControllers");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Add a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Inception"
 *               description:
 *                 type: string
 *                 example: "A mind-bending thriller"
 *               posterUrl:
 *                 type: string
 *                 example: "http://example.com/inception.jpg"
 *               adult:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Movie created successfully
 *       400:
 *         description: Error adding movie
 *
 */
router.post("/", verifyToken, verifyAdmin, addMovie);
/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     responses:
 *       200:
 *         description: Returns all movies
 *
 *       204:
 *         description: No movies found
 *
 *       400:
 *         description: Error getting movies
 *
 */
router.get("/", getAllMovies);
router.get("/latest", getLatestMovies);
router.get("/:id", getMovieById);
router.patch("/:id", verifyToken, verifyAdmin, updateMovie);
router.delete("/:id/deletemovie", verifyToken, verifyAdmin, deleteMovie);

module.exports = router;
