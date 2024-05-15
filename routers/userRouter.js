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
router.post("/login", userLogin);
router.patch("/:id/favorite", verifyToken, editUser);
router.patch("/:id/favorite", verifyToken, addToFavourites);
router.patch("/:id/deletefav", verifyToken, deleteFavourite);
router.get("/favourites", verifyToken, getFavouriteFromUser);
router.get("/tokenrefresh", verifyToken, generateRefresh);

module.exports = router;
