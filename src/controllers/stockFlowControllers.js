const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFlowList = async (req, res) => {
  try {
    const result = await prisma.flow.findMany();
    let processedData = [];
    result.forEach((flow) => {
      let date = `${flow.date.getDate()}/${
        flow.date.getMonth() + 1
      }/${flow.date.getFullYear()}`;
      return processedData.push({ ...flow, date });
    });
    return res.status(200).json(processedData);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getFlowById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await prisma.flow.findUnique({ where: { id } });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const postNewFlow = async (req, res) => {
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
      await prisma.products.update({
        where: { bar_code },
        data: { stock: { increment: amount } },
      });
    } else {
      await prisma.products.update({
        where: { bar_code },
        data: { stock: { decrement: amount } },
      });
    }
    const result = await prisma.flow.create({
      data: { type, amount, product_bar_code: bar_code },
    });
    return res
      .status(201)
      .json({ message: "Fluxo criado com sucesso.", result });
  } catch (error) {
    // console.log(error);
    if (error.code == "P2025") {
      return res.status(400).json({
        message: "O Código de barras não pertence a nenhum produto registrado.",
      });
    }
    return res.status(400).json(error);
  }
};

const deleteFlowById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { type, product_bar_code, amount } = await prisma.flow.findUnique({
      where: { id },
    });
    if (type === "Produção") {
      await prisma.products.update({
        where: { bar_code: product_bar_code },
        data: { stock: { decrement: amount } },
      });
    } else {
      await prisma.products.update({
        where: { bar_code: product_bar_code },
        data: { stock: { increment: amount } },
      });
    }
    await prisma.flow.delete({ where: { id } });
    return res.status(200).json({ message: "Fluxo Excluido com Sucesso." });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const patchFlowById = async (req, res) => {
  let { id } = req.params;
  let { type, amount, bar_code } = req.body;
  id = Number(id);

  try {
    const attAmount = await prisma.flow.findUnique({
      where: { id },
    });
    if (attAmount.type === "Produção") {
      await prisma.products.update({
        where: { bar_code },
        data: { stock: { decrement: attAmount.amount } },
      });
    } else {
      await prisma.products.update({
        where: { bar_code },
        data: { stock: { increment: attAmount.amount } },
      });
    }
    if (type === "Produção") {
      await prisma.products.update({
        where: { bar_code },
        data: { stock: { increment: amount } },
      });
    } else {
      await prisma.products.update({
        where: { bar_code },
        data: { stock: { decrement: amount } },
      });
    }
    await prisma.flow.update({
      where: { id },
      data: { type, amount, product_bar_code: bar_code },
    });

    return res.status(200).json({ message: "Fluxo Editado com Sucesso." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFlowList,
  getFlowById,
  postNewFlow,
  deleteFlowById,
  patchFlowById,
};
