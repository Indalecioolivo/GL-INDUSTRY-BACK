const pool = require("../conection");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("Select * from users");
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(400).json({ message: "Algo deu errado.", error });
  }
};

const postNewUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  if (!email) {
    return res.status(400).json({ message: "O email é obrigatório." });
  }
  if (!password) {
    return res.status(400).json({ message: "O password é obrigatório." });
  }
  if (!first_name) {
    return res.status(400).json({ message: "O first_name é obrigatório." });
  }
  if (!last_name) {
    return res.status(400).json({ message: "O last_name é obrigatório." });
  }

  try {
    await pool.query(
      `insert into users 
        (email, password, first_name, last_name)
        values
        ('${email}', '${password}', '${first_name}', '${last_name}');`
    );
    return res.status(201).json({ message: "Usuário Criado." });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = { getAllUsers, postNewUser };
