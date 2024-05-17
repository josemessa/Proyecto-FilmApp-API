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
 *     summary: Añadir una nueva pelicula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Matrix"
 *               description:
 *                 type: string
 *                 example: "Hasta donde llegarias para conocer la verdad?"
 *               posterUrl:
 *                 type: string
 *                 example: "http://example.com/matrix.jpg"
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
 *     summary: Obtener todas las peliculas
 *     responses:
 *       200:
 *         description: Todas las peliculas han sido obtenidas
 *
 *       204:
 *         description: No movies found
 *
 *       400:
 *         description: Error getting movies
 *
 */
router.get("/", getAllMovies);
/**
 * @swagger
 * /latest-movies:
 *   get:
 *     summary: Obtener las ultimas peliculas añadidas
 *     responses:
 *       200:
 *         description: Ultimas peliculas obtenidas
 *       204:
 *         description: No latest movies found
 *       400:
 *         description: Error getting latest movies
 */

router.get("/latest", getLatestMovies);
/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Obtener una pelicula por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pelicula que buscamos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pelicula obtenida correctamente
 *       204:
 *         description: No movie found with that ID
 *       400:
 *         description: Error getting movie by ID
 */
router.get("/:id", getMovieById);
router.patch("/:id", verifyToken, verifyAdmin, updateMovie);
router.delete("/:id/deletemovie", verifyToken, verifyAdmin, deleteMovie);

module.exports = router;
