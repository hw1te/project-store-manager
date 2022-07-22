const connection = require('./connection');

const salesModel = {
  createSale: async (sales) => {
    const idQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const salesQuery = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`;

    const [{ insertId }] = await connection.query(idQuery);

    await Promise.all(
      sales.map(async (sale) => {
        await connection.query(salesQuery, [insertId, sale.productId, sale.quantity]);
      }),
    );

    return insertId;
  },
};

module.exports = salesModel;