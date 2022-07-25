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

  update: async (name, id) => {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';

    const data = await connection.query(query, [name, id]);
    return data;
  },
};

module.exports = productsModel; 