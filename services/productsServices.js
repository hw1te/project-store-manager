const productModel = require('../models/products');

const productService = {
  getAll: async () => {
    const data = await productModel.getAll();

    return data;
  },

  getById: async (id) => {
    const data = await productModel.getById(id);
    if (!data) {
      return { code: 404, data: { message: 'Product not found' } };
    }

    return { code: 200, data };
  },
};

module.exports = productService; 