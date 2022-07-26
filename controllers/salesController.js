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
    return res.status(code).json(data);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const { code, data } = await salesServices.delete(id);

    return res.status(code).json(data);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { code, data } = await salesServices.update(id, req.body);
    return res.status(code).json(data);
  },
};

module.exports = salesController;