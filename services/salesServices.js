const salesModel = require('../models/sales');
const productsModel = require('../models/products');
const { validate } = require('../schemas/salesSchema');

const salesService = {
  createSale: async (sales) => {
    const validation = sales.map((sale) => validate(sale.productId, sale.quantity));
    const isError = validation.find((error) => error);
    if (isError) {
      return isError;
    }

    const findId = await Promise.all(
      sales.map(async (sale) => productsModel.getById(sale.productId)),
    );

    if (findId.some((product) => product === undefined)) {
      return { code: 404, data: { message: 'Product not found' } };
    }

    const id = await salesModel.createSale(sales);
    return { code: 201, data: { id, itemsSold: sales } };
  },
};

module.exports = salesService;
