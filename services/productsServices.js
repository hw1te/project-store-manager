const productsModel = require('../models/products');

const productsService = {
  getAll: async () => {
    const data = await productsModel.getAll();

    return data;
  },

  getById: async (id) => {
    const data = await productsModel.getById(id);
    if (!data) {
      return { code: 404, data: { message: 'Product not found' } };
    }

    return { code: 200, data };
  },

  create: async (name) => {
    const id = await productsModel.create(name);

    return { id, name };
  },
};

module.exports = productsService;