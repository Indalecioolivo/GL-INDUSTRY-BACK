const express = require("express");
const routes = express();

routes.get("/", (req, res) => {
  res.send("Olá mundo");
});

module.exports = routes;
