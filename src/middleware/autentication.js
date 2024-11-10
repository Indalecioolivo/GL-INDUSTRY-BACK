const jwt = require("jsonwebtoken");
const jwtPass = require("../jwtPass");

const autenticationUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Non authorized" });
  }
  const token = authorization.split(" ")[1];
  try {
    const tokenUser = await jwt.verify(token, jwtPass);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Non authorized" });
  }
};

module.exports = { autenticationUser };
