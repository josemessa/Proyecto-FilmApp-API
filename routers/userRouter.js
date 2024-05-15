const router = require("express").Router();
const {
  addUser,
  userLogin,
  addToFavourites,
  deleteFavourite,
  getFavouriteFromUser,
  generateRefresh,
  editUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Añadir usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               favourites:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Usuario creado
 *       400:
 *         description: Error al crear el usuario
 */

router.post("/signup", addUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario logueado
 *       400:
 *         description: pasworrd o email incorrectos
 */
router.post("/login", userLogin);
/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Actualizar información de usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error al actualizar el usuario
 *       404:
 *         description: Usuario no encontrado
 */

router.patch("/:id/favorite", verifyToken, editUser);
/**
 * @swagger
 * /users/{userId}/favourites/{movieId}:
 *   post:
 *     summary: Agregar una película a los favoritos de un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario al que se le agregarán los favoritos
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película que se agregará a los favoritos
 *     responses:
 *       200:
 *         description: Película agregada a los favoritos del usuario
 *       204:
 *         description: El ID de usuario o de película no se encontró
 *       400:
 *         description: Error al agregar la película a los favoritos
 */
router.patch("/:id/favorite", verifyToken, addToFavourites);
/**
 * @swagger
 * /users/{userId}/favourites/{movieId}:
 *   delete:
 *     summary: Eliminar película de favoritos
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a cuya lista de favoritos eliminaremos un elemento
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película que se eliminará de favoritos
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente
 *       204:
 *         description: ID de usuario o película no encontrado
 *       400:
 *         description: Error al eliminar la película
 */
router.patch("/:id/deletefav", verifyToken, deleteFavourite);
/**
 * @swagger
 * /users/{userId}/favourites:
 *   get:
 *     summary: Obtener lista favoritos de un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de películas favoritas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       204:
 *         description: ID de usuario no encontrado o lista de favoritos vacía
 *       400:
 *         description: Error al obtener la lista de películas favoritas
 */

router.get("/favourites", verifyToken, getFavouriteFromUser);
/**
 * @swagger
 * /users/refresh-token:
 *   post:
 *     summary: Generar nuevo token de acceso y token de refresco
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nuevo token de acceso y token de refresco
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la operación
 *                 token:
 *                   type: string
 *                   description: Nuevo token de acceso
 *                 token_refresh:
 *                   type: string
 *                   description: Nuevo token de refresco
 *       400:
 *         description: Error al generar nuevos tokens de acceso y refresco
 */

router.get("/tokenrefresh", verifyToken, generateRefresh);

module.exports = router;
