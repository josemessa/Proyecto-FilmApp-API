const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "FilmAPP",
      version: "1.0.0",
      descripcion: "Api del proyecto del modulo 7 FilmApp",
    },
    server: {
      url: "http://localhost:1000",
      description: "servidor local",
    },
  },
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
