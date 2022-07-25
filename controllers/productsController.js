const productsService = require('../services/productsServices');

const productsController = {
  getAll: async (_req, res) => {
    const data = await productsService.getAll();
    return res.status(200).json(data);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const { code, data } = await productsService.getById(id);
    return res.status(code).json(data);
  },

  create: async (req, res) => {
    const { name } = req.body;

    const { code, data } = await productsService.create(name);
    console.log(data);
    return res.status(code).json(data);
  },

  update: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const { code, data } = await productsService.update(name, id);
    console.log(name);
    return res.status(code).json(data);
  },
};

module.exports = productsController;
