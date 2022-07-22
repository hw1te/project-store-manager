const express = require('express');
const productRouter = require('./routes/productsRoutes');
const salesRouter = require('./routes/salesRoutes');

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/sales', salesRouter);

module.exports = app;