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

  getAll: async () => {
    const query = `
      SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
      FROM StoreManager.sales_products AS sp
      JOIN StoreManager.sales AS s ON s.id = sp.sale_id
    `;
    const [sales] = await connection.query(query);
    return sales;
  },

  getById: async (id) => {
    const query = `
    SELECT s.date, sp.product_id AS productId, sp.quantity 
    FROM StoreManager.sales_products AS sp INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id WHERE s.id = ?`;
    const [sale] = await connection.query(query, [id]);

    return sale;
  },

  delete: async (id) => {
    const querySales = 'DELETE FROM StoreManager.sales WHERE id = ?';

    await connection.query(querySales, [id]);
  },

  update: async (id, sales) => {
    await connection.query('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
    await Promise.all(
      sales.map(async (sale) => {
        const updateQuery = `
          INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?)
        `;
        await connection.query(updateQuery, [sale.productId, id, sale.quantity]);
      }),
    );
  },
};

module.exports = salesModel;