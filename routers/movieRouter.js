const router = require("express").Router();
const{addMovie}= require("../controllers/movieControllers")

router.post("/", addMovie);

module.exports = router;
