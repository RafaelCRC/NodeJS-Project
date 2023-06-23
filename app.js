const express = require('express');
const app = express();
const morgan = require('morgan');

const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const { error } = require('console');

app.use(morgan('dev'));

app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

app.use((req, res, next) => {
    const error = new Error('Not found.')
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message
        }
    });
});

module.exports = app;