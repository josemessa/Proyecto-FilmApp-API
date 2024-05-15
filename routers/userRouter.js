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
 *     summary: Crear un nuevo usuario
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
 *         description: Usuario creado correctamente
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
 *         description: ID del usuario que se actualizará
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
 *         description: Usuario actualizado exitosamente
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
router.patch("/:id/deletefav", verifyToken, deleteFavourite);
router.get("/favourites", verifyToken, getFavouriteFromUser);
router.get("/tokenrefresh", verifyToken, generateRefresh);

module.exports = router;
