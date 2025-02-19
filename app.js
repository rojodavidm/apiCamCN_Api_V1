const express = require("express");
const path = require("path");
const app = express();
const rutas = require('./router/Routers.js');
require('dotenv').config();
const looger = require('./utils/looger.js');

const PORT = process.env.PORT ||3000;
const HOST = 'localhost';

app.use("/api/prod/v1", rutas);

app.listen(PORT, () => {
    looger.info("Server Iniciado",PORT);
})      



