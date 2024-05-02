const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 1000;



const app = express();
app.use(express.json());

const userRouter = require("./routers/userRouter");
const moviesRouter=require("./routers/movieRouter")

const urlMongo = process.env.DATABASE;
mongoose.connect(urlMongo);
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("ERROR AL CONECTAR");
});

db.once("connected", () => {
  console.log("MONGO CONECTADO");
});

db.on("disconnected", () => {
  console.log("MONGO DESCONECTADO");
});

app.use("/users", userRouter);
app.use("/movies",moviesRouter)

app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});


// Sin autenticación:
// GET /movies (Para obtener todas las películas)
// GET /movies/:id (Para obtener el detalle de una película)
// GET /recent_movies (Para obtener las películas recientes, obtener las 10 peliculas
// insertadas recientemente)
// GET /most_popular (Para obtener las películas mejor valoradas, obtener las 10
// películas mejora valoradas)
// POST /login (EndPoint para loguearse en la app) --------------- DONE
// POST /signup (EndPoint para registrase en la app)---------------- DONE


// Con autenticación:
// GET /user/favorite , para obtener la lista de películas favoritas del usuario
// logueado
// POST /user/:idMovie/favorite , para añadir películas a favoritos
// DELETE /user/:idMovie/favorite , para borrar películas de favoritos
// POST /movies , para añadir películas solo los administradores  ----------es
// PATCH /movies/:id , para actualizar películas solo los administradores
// GET /genereToken Para recuperar el token normal y token de refresco y es el
// único donde utilizamos el REFRESH_TOKEN
