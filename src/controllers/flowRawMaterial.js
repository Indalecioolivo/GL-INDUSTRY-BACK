const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFlowRawMaterialList = async (req, res) => {
  try {
    const result = await prisma.flowRawMaterial.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getFlowByBarCode = async (req, res) => {
  const { bar_code } = req.params;
  if (bar_code.length != 13) {
    return res.status(400).json({ message: "Código de barras inválido." });
  }
  try {
    const result = await prisma.flowRawMaterial.findMany({
      where: { rawMaterial_bar_code: bar_code },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const postNewFlowRawMaterial = async (req, res) => {
  const { type, amount, bar_code } = req.body;
  if (!type) {
    return res.status(400).json({ message: "O tipo de fluxo é obrigatório." });
  }
  if (!amount) {
    return res.status(400).json({ message: "A quantidade é obrigatória." });
  }
  if (!bar_code || bar_code.length != 13) {
    return res.status(400).json({ message: "Código de barras inválido." });
  }
  try {
    if (type === "Produção") {
      await prisma.rawMaterial.update({
        where: { bar_code },
        data: { stock: { increment: amount } },
      });
    } else {
      await prisma.rawMaterial.update({
        where: { bar_code },
        data: { stock: { decrement: amount } },
      });
    }
    const result = await prisma.flowRawMaterial.create({
      data: { type, amount, rawMaterial_bar_code: bar_code },
    });
    return res
      .status(201)
      .json({ message: "Fluxo criado com sucesso.", result });
  } catch (error) {
    if (error.code == "P2025") {
      return res.status(400).json({
        message: "O Código de barras não pertence a nenhum produto registrado.",
      });
    }
    return res.status(400).json(error);
  }
};

const patchFlowRawMaterial = async (req, res) => {
  const id = Number(req.params.id);
  let { type, amount, bar_code } = req.body;
  try {
    const oldFlow = await prisma.flowRawMaterial.findUnique({ where: { id } });
    console.log(oldFlow.rawMaterial_bar_code);

    if (oldFlow.type === "Produção") {
      await prisma.rawMaterial.update({
        where: { bar_code: oldFlow.rawMaterial_bar_code },
        data: { stock: { decrement: oldFlow.amount } },
      });
    } else {
      await prisma.rawMaterial.update({
        where: { bar_code: oldFlow.rawMaterial_bar_code },
        data: { stock: { increment: oldFlow.amount } },
      });
    }
    if (type === "Produção") {
      await prisma.rawMaterial.update({
        where: { bar_code },
        data: { stock: { increment: amount } },
      });
    } else {
      await prisma.rawMaterial.update({
        where: { bar_code },
        data: { stock: { decrement: amount } },
      });
    }
    await prisma.flowRawMaterial.update({
      where: { id },
      data: { type, amount, rawMaterial_bar_code: bar_code },
    });
    return res.status(200).json({ message: "Fluxo Editado com Sucesso." });
  } catch (error) {
    console.log(error);
  }
};

const deleteFlowRawMaterial = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { type, rawMaterial_bar_code, amount } =
      await prisma.flowRawMaterial.findUnique({ where: { id } });

    if (type === "Produção") {
      await prisma.rawMaterial.update({
        where: { bar_code: rawMaterial_bar_code },
        data: { stock: { decrement: amount } },
      });
    } else {
      await prisma.rawMaterial.update({
        where: { bar_code: rawMaterial_bar_code },
        data: { stock: { increment: amount } },
      });
    }
    await prisma.flowRawMaterial.delete({ where: { id } });
    return res.status(200).json({ message: "Produto Excluído com Sucesso." });
  } catch (error) {
    console.log(error);

    return res.status(400).json(error);
  }
};

module.exports = {
  getFlowRawMaterialList,
  getFlowByBarCode,
  postNewFlowRawMaterial,
  patchFlowRawMaterial,
  deleteFlowRawMaterial,
};
