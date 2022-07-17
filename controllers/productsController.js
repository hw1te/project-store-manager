const productsService = require('../services/productsServices');

const productsController = {
  getAll: async (_req, res) => {
    const data = await productsService.getAll();
    return res.json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const { code, data } = await productsService.getById(id);
    return res.status(code).json(data);
  },

  create: async (req, res) => {
    const result = await productsService.create(req.body.name);
    return res.status(201).json(result);
  },
};

module.exports = productsController;
