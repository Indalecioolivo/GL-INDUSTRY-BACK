const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtPass = require("../jwtPass");

const getAllUsers = async (req, res) => {
  try {
    const result = await prisma.users.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: "Algo deu errado.", error });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  let dataUser = {};
  try {
    const result = await prisma.users.findUnique({
      where: { email },
    });
    if (result === null) {
      return res.status(404).json({ error: "Credenciais Incorretas." });
    }
    dataUser = {
      id: result.id,
      email: result.email,
      name: result.name,
      last_name: result.last_name,
    };
    return res.status(200).json(dataUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postNewUser = async (req, res) => {
  let { email, password, name, last_name } = req.body;
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

  password = await bcrypt.hash(password, 10);

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

const postLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body.credentials;
  try {
    const dataUser = await prisma.users.findUnique({
      where: { email: userEmail },
    });
    const { id, name, last_name } = dataUser;

    const validPass = await bcrypt.compare(userPassword, dataUser.password);

    if (dataUser.email === userEmail && validPass) {
      const token = jwt.sign({ id }, jwtPass, { expiresIn: "8h" });
      return res.status(200).json({ token, id, name, last_name });
    } else {
      return res
        .status(404)
        .json({ message: "Usuário e/ou Senha incorretos." });
    }
  } catch (error) {
    return res.status(400).send({ message: "Usuário e/ou Senha incorretos." });
  }
};

module.exports = {
  getAllUsers,
  postNewUser,
  getUserByEmail,
  deleteUser,
  postLogin,
};
