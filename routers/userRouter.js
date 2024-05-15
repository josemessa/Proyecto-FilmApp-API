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
