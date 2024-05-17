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
 *     summary: Añadirr una nueva pelicula
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
 *         description: Pelicula creada
 *       400:
 *         description: Error al crear la pelicula
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
 *         description: No se encontraron pepliculas
 *
 *       400:
 *         description: Error al obtener peliculas
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
 *         description: No se encontraron peliculas
 *       400:
 *         description: Error al obtener las ultimas peñiculas
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
 *         description: No se encontro pelicula con ese ID
 *       400:
 *         description: Error al obtener pelicula con ese ID
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Actualizar datos de una pelicula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pelucula a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               posterUrl:
 *                 type: string
 *               adult:
 *                 type: boolean
 *               popularity:
 *                 type: number
 *               average:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pelicula actualizada
 *       204:
 *         description: No se encontro pelicula con ese ID
 *       400:
 *         description: Error al actualizar pelicula
 */
router.patch("/:id", verifyToken, verifyAdmin, updateMovie);
/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Borrar una pelicula
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pelicula a borrrar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pelicula eliminada
 *       204:
 *         description: Pelicula no encontrada
 *       400:
 *         description: Error al eliminar la plecula
 */

router.delete("/:id/deletemovie", verifyToken, verifyAdmin, deleteMovie);

module.exports = router;
