const express = require("express");
const routes = express();
const {
  getAllUsers,
  postNewUser,
  getUserByEmail,
  deleteUser,
} = require("./controllers/usersControllers");
const {
  getProductList,
  getProductById,
  postNewProduct,
  patchProduct,
  deleteProduct,
} = require("./controllers/productsControllers");
const {
  getFlowList,
  getFlowById,
  postNewFlow,
  deleteFlowById,
} = require("./controllers/stockFlowControllers");

routes.get("/users", getAllUsers);
routes.post("/users/newUser", postNewUser);
routes.get("/users/findUser/:email/:password", getUserByEmail);
routes.delete("/users/:email", deleteUser);

routes.get("/products", getProductList);
routes.get("/products/:id", getProductById);
routes.post("/products", postNewProduct);
routes.patch("/products/:id", patchProduct);
routes.delete("/products/:id", deleteProduct);

routes.get("/flows", getFlowList);
routes.get("/flows/:id", getFlowById);
routes.post("/flows", postNewFlow);
routes.delete("/flows/:id", deleteFlowById);

module.exports = routes;
