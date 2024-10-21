const { db } = require("../services/db");
const pool = require("../conection");

const getProductList = async (req, res) => {
  try {
    const result = await pool.query("select * from products");
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`select * from products where id = ${id}`);
    return res.json(result.rows);
  } catch (error) {
    return res.status(400).json(error);
  }
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

  try {
    await pool.query(
      `insert into products
      (bar_code, name, description, volume, stock, price)
      values
      ('${bar_code}', '${name}', '${description}', ${volume}, ${stock}, ${price})
      `
    );
  } catch (error) {
    return res.status(400).json(error);
  }

  return res.status(201).json({ message: "Produto cadastrado com sucesso" });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`delete from products where id = ${id}`);
    return res.status(204).json();
  } catch (error) {
    res.status(400).json(error);
  }
};

const patchProduct = async (req, res) => {
  const { id } = req.params;
  const { bar_code, name, description, volume, stock, price } = req.body;
  if (bar_code && bar_code.length == 13) {
    try {
      await pool.query(
        `update products set bar_code='${bar_code}' where id=${id};`
      );
      return res.status(200).send();
    } catch (error) {
      return res.status(304).json(error);
    }
  }
};

module.exports = {
  getProductList,
  getProductById,
  postNewProduct,
  patchProduct,
  deleteProduct,
};
