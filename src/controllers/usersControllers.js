const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const result = await prisma.users.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: "Algo deu errado.", error });
  }
};

const getUserByEmail = async (req, res) => {
  const { email, password } = req.params;

  try {
    const result = await prisma.users.findUnique({
      where: { email, password },
    });
    if (result === null) {
      return res.status(404).json({ error: "Credenciais Incorretas." });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postNewUser = async (req, res) => {
  const { email, password, name, last_name } = req.body;
  if (!email) {
    return res.status(400).json({ message: "O email é obrigatório." });
  }
  if (!password) {
    return res.status(400).json({ message: "O password é obrigatório." });
  }
  if (!name) {
    return res.status(400).json({ message: "O name é obrigatório." });
  }
  if (!last_name) {
    return res.status(400).json({ message: "O last_name é obrigatório." });
  }

  try {
    await prisma.users.create({
      data: { email, password, name, last_name },
    });

    return res.status(201).json({ message: "Usuário Criado." });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params;
  try {
    await prisma.users.delete({
      where: { email },
    });

    res.status(200).send({ message: "Usuário Excluido com Sucesso." });
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { getAllUsers, postNewUser, getUserByEmail, deleteUser };
