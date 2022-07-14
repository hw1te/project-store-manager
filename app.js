const express = require('express');
const productRouter = require('./routes/productsRoutes');

const app = express();

app.use(express.json());
app.get('/', (_req, res) => {
  res.status(200).end();
});
app.use('/products', productRouter);

module.exports = app;