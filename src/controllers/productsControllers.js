const { db } = require("../services/db");

const getProductList = async (req, res) => {
  return res.json(db);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const productSearched = db.find((product) => {
    return product.id == id;
  });
  return res.json(productSearched);
};

const postNewProduct = async (req, res) => {
  const { bar_code, name, description, volume, stock, price } = req.body;
  if (!bar_code || bar_code.length != 13) {
    return res.status(400).json({ message: "Código de barras inválido." });
  }
  if (!name) {
    return res.status(400).json({ message: "O nome é obrigatório." });
  }
  if (!volume) {
    return res.status(400).json({ message: "O volume é obrigatório." });
  }
  const newProduct = { bar_code, name, description, volume, stock, price };

  return res.status(201).json({ message: "Produto cadastrado com sucesso" });
};

module.exports = { getProductList, getProductById, postNewProduct };
