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

    if (validation !== true) {
      return validation;
    }

    const id = await productsModel.create(name);

    return { code: 201, data: { id, name } };
  },

  update: async (name, id) => {
    const foundProduct = await productsModel.getById(id);

    if (!foundProduct) {
      return { code: 404, data: { message: 'Product not found' } };
    }

    const validation = validate(name);

    if (validation !== true) {
      return validation;
    }
    await productsModel.update(name, id);

    return { code: 200, data: { id, name } };
  },

  delete: async (id) => {
    const foundProduct = await productsModel.getById(id);

    if (!foundProduct) {
      return { code: 404, data: { message: 'Product not found' } };
    }
    await productsModel.delete(id);

    return { code: 204, data: '' };
  },

  search: async (name) => {
    const products = await productsModel.getAll();
    if (name.length === 0) {
      return products;
    }
    const data = products.filter((product) => product.name.includes(name));
    return data;
  },
};

module.exports = productsService;