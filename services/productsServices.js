const productsModel = require('../models/products');
const { validate } = require('../schemas/productsSchema');

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
    const validation = validate(name);
    console.log(validation.data.message);

    if (validation.data.message) {
      return validation;
    }

    const id = await productsModel.create(name);

    return { code: 201, data: { id, name } };
  },
};

module.exports = productsService;