const { flowdb } = require("../services/db");

const getFlowList = async (req, res) => {
  return res.json(flowdb);
};

const getFlowById = async (req, res) => {
  const { id } = req.params;
  const flowSearched = flowdb.find((flow) => {
    return flow.id == id;
  });
  return res.json(flowSearched);
};

const postNewFlow = async (req, res) => {
  const { name, amount, date, type, bar_code } = req.body;
  if (!name) {
    return res.status(400).json({ message: "O nome é obrigatório" });
  }
  if (!amount) {
    return res.status(400).json({ message: "A quantidade é obrigatória." });
  }
  if (!type) {
    return res.status(400).json({ message: "O tipo de fluxo é obrigatório." });
  }
  if (!bar_code || bar_code.length != 13) {
    return res.status(400).json({ message: "Código de barras inválido." });
  }
  const newFlow = { name, amount, date, type, bar_code };

  return res.status(201).json({ message: "Fluxo criado com sucesso." });
};

module.exports = { getFlowList, getFlowById, postNewFlow };
