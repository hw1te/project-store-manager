const salesServices = require('../services/salesServices');

const salesController = {
  createSale: async (req, res) => {
    const { code, data } = await salesServices.createSale(req.body);

    return res.status(code || 500).json(data);
  },

  getAll: async (_req, res) => {
    const data = await salesServices.getAll();

    res.status(200).json(data);
  },

  getById: async (req, res) => {
    const { code, data } = await salesServices.getById(req.params.id);
    console.log(data);
    return res.status(code).json(data);
  },
};

module.exports = salesController;