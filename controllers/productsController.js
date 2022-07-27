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
    return res.status(code).json(data);
  },

  update: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const { code, data } = await productsService.update(name, id);
    return res.status(code).json(data);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const { code, data } = await productsService.delete(id);

    return res.status(code).json(data);
  },

  search: async (req, res) => {
    const { q } = req.query;
    const data = await productsService.search(q);
    return res.json(data);
  },
};

module.exports = productsController;
