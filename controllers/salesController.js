const salesServices = require('../services/salesServices');

const salesController = {
  createSale: async (req, res) => {
    const { code, data } = await salesServices.createSale(req.body);

    return res.status(code || 500).json(data);
  },
};

module.exports = salesController;