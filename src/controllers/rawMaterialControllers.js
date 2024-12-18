const { PrismaClient } = require("@prisma/client");
const { validateBarCode, validateName } = require("../utils/validations");
const prisma = new PrismaClient();

const getAllRawMaterials = async (req, res) => {
  try {
    const result = await prisma.rawMaterial.findMany();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getRawMaterialByBarCode = async (req, res) => {
  const { bar_code } = req.params;
  if (!validateBarCode(bar_code)) {
    return res.status(404).json({ message: "Código de barras inválido." });
  }
  try {
    const result = await prisma.rawMaterial.findUnique({ where: { bar_code } });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const postNewRawMaterial = async (req, res) => {
  const { bar_code, name, stock } = req.body;
  const barCodeValid = validateBarCode(bar_code);
  const nameValid = validateName(name);
  if (!barCodeValid) {
    return res.status(404).json({ message: "Código de Barras Inválido." });
  }
  if (!nameValid) {
    return res.status(404).json({ message: "Nome é Obrigatório." });
  }
  try {
    await prisma.rawMaterial.create({ data: { ...req.body } });
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

const deleteRawMaterial = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.rawMaterial.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: "Matéria prima deletada com sucesso." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRawMaterials,
  postNewRawMaterial,
  getRawMaterialByBarCode,
  deleteRawMaterial,
};
