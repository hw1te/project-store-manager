const connection = require('./connection');

const productsModel = {
  getAll: async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [result] = await connection.query(query);
    return result;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[result]] = await connection.query(query, id);

    return result;
  },
};

module.exports = productsModel; 