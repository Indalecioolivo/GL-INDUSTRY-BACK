const express = require("express");
const routes = express();
const {
  getProductList,
  getProductById,
  postNewProduct,
} = require("./controllers/productsControllers");
const {
  getFlowList,
  getFlowById,
  postNewFlow,
} = require("./controllers/stockFlowControllers");

routes.get("/products", getProductList);
routes.get("/products/:id", getProductById);
routes.post("/products", postNewProduct);

routes.get("/flow", getFlowList);
routes.get("/flow/:id", getFlowById);
routes.post("/flow", postNewFlow);

module.exports = routes;
