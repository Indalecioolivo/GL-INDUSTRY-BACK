const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProductList = async (req, res) => {
  try {
    const result = await prisma.products.findMany();
    res.json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getProductById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await prisma.products.findUnique({ where: { id } });
    if (result === null) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    return res.status(200).json(result);
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
    await prisma.products.create({
      data: {
        ...req.body,
      },
    });
    return res.status(201).json({
      message: "Produto cadastrado com sucesso",
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Código de barras já foi atribuido à outro produto.",
      });
    }
    return res.status(400).json(error);
  }
};

const patchProduct = async (req, res) => {
  const id = Number(req.params.id);
  const { bar_code, name, description, volume, stock, price } = req.body;
  if (bar_code && bar_code.length != 13) {
    return res.status(400).json({ message: "Código de barras inválido." });
  }
  try {
    const result = await prisma.products.update({
      where: { id },
      data: { ...req.body },
    });
    return res.status(200).send(result);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(400).json({ message: "Produto Inexistente." });
    }
    return res.status(400).json(error);
  }
};

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.products.delete({
      where: {
        id,
      },
    });
    return res.status(204).json();
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
};

module.exports = {
  getProductList,
  getProductById,
  postNewProduct,
  patchProduct,
  deleteProduct,
};
