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
router.patch("/:id/favorite", verifyToken, editUser);
router.patch("/:id/favorite", verifyToken, addToFavourites);
router.patch("/:id/deletefav", verifyToken, deleteFavourite);
router.get("/favourites", verifyToken, getFavouriteFromUser);
router.get("/tokenrefresh", verifyToken, generateRefresh);

module.exports = router;
