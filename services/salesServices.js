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

  getAll: async () => {
    const data = await salesModel.getAll();
    console.log(data);
    return data;
  },

  getById: async (id) => {
    const data = await salesModel.getById(id);
    if (!data.length) {
      return { code: 404, data: { message: 'Sale not found' } };
    }

    return { code: 200, data };
  },

  delete: async (id) => {
    const data = await salesModel.getById(id);
    if (!data.length) {
      return { code: 404, data: { message: 'Sale not found' } };
    }
    await salesModel.delete(id);

    return { code: 204, data: '' };
  },

  update: async (id, sales) => {
    const findSalesId = await salesModel.getById(id);
    const validation = sales.map((sale) => validate(sale.productId, sale.quantity));
    const isError = validation.find((error) => error);
    if (isError) {
      return isError;
    }
    if (findSalesId.length === 0) {
      return { code: 404, data: { message: 'Sale not found' } };
    }
    const mapId = sales.map((sale) => findSalesId.some((findSale) =>
      sale.productId === findSale.productId));
    if (mapId.includes(false)) {
      return { code: 404, data: { message: 'Product not found' } };
    }
    await salesModel.update(id, sales);
    return { code: 200, data: { saleId: id, itemsUpdated: sales } };
  },
};

module.exports = salesService;
