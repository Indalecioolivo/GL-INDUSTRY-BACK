const express = require("express");
const routes = express();
const { getAllUsers, postNewUser } = require("./controllers/usersControllers");
const {
  getProductList,
  getProductById,
  postNewProduct,
  deleteProduct,
} = require("./controllers/productsControllers");
const {
  getFlowList,
  getFlowById,
  postNewFlow,
} = require("./controllers/stockFlowControllers");

routes.get("/users", getAllUsers);
routes.post("/users/newUser", postNewUser);

routes.get("/products", getProductList);
routes.get("/products/:id", getProductById);
routes.post("/products", postNewProduct);
routes.delete("/products/:id", deleteProduct);

routes.get("/flow", getFlowList);
routes.get("/flow/:id", getFlowById);
routes.post("/flow", postNewFlow);

module.exports = routes;
