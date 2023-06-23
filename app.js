const express = require('express')
const app = express();

const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');

app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

module.exports = app;