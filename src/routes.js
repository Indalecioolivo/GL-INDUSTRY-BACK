const express = require("express");
const routes = express();
const {
  getAllUsers,
  postNewUser,
  getUserByEmail,
  deleteUser,
  postLogin,
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
  patchFlowById,
} = require("./controllers/stockFlowControllers");
const {
  getAllRawMaterials,
  postNewRawMaterial,
  getRawMaterialByBarCode,
  patchRawMaterial,
  deleteRawMaterial,
} = require("./controllers/rawMaterialControllers");
const {
  getFlowRawMaterialList,
  getFlowByBarCode,
  postNewFlowRawMaterial,
  patchFlowRawMaterial,
  deleteFlowRawMaterial,
} = require("./controllers/flowRawMaterial");

const { autenticationUser } = require("./middleware/autentication");

routes.get("/users", getAllUsers);
routes.post("/users/newUser", postNewUser);
routes.get("/users/findUser/:email", getUserByEmail);
routes.delete("/users/:email", deleteUser);
routes.post("/login", postLogin);

routes.use(autenticationUser);
routes.get("/products", getProductList);
routes.get("/products/:id", getProductById);
routes.post("/products", postNewProduct);
routes.patch("/products/:id", patchProduct);
routes.delete("/products/:id", deleteProduct);

routes.get("/flows", getFlowList);
routes.get("/flows/:id", getFlowById);
routes.post("/flows", postNewFlow);
routes.patch("/flows/:id", patchFlowById);
routes.delete("/flows/:id", deleteFlowById);

routes.get("/raw-materials", getAllRawMaterials);
routes.get("/raw-materials/:bar_code", getRawMaterialByBarCode);
routes.post("/raw-materials", postNewRawMaterial);
routes.patch("/raw-materials/:id", patchRawMaterial);
routes.delete("/raw-materials/:id", deleteRawMaterial);

routes.get("/flows-raw-materials", getFlowRawMaterialList);
routes.get("/flows-raw-materials/:bar_code", getFlowByBarCode);
routes.post("/flows-raw-materials", postNewFlowRawMaterial);
routes.patch("/flows-raw-materials/:id", patchFlowRawMaterial);
routes.delete("/flows-raw-materials/:id", deleteFlowRawMaterial);

module.exports = routes;
