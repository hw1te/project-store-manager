const connection = require('./connection');

const productsModel = {
  getAll: async () => {
    const [products] = await connection.query('SELECT * FROM StoreManager.products');
    return products;
  },

  getById: async (id) => {
    const [[product]] = await connection
      .query('SELECT * FROM StoreManager.products WHERE id = ?', [id]);

    return product;
  },

  create: async (name) => {
    const [{ insertId }] = await connection
      .query('INSERT INTO StoreManager.products (name) VALUES(?)', [name]);

    return insertId;
  },
};

module.exports = productsModel; 