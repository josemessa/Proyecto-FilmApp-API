const router = require("express").Router();
const{ addUser, login, userLogin }= require("../controllers/userController")


router.post("/signup",addUser);
router.post("/login", userLogin )


module.exports = router;
