const productsService = require('../services/productsServices');

const productsController = {
  getAll: async (_req, res) => {
    const data = await productsService.getAll();
    return res.json(data);
  },

  getById: async (req, res) => {
    const { code, data } = await productsService.getById(req.id);
    return res.status(code).json(data);
  },
};

module.exports = productsController;
