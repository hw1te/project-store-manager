const express = require('express');
const productRouter = require('./routes/productsRoutes');

const app = express();

app.use(express.json());

app.use('/products', productRouter);

module.exports = app;