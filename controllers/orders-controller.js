const mysql = require("../mysql");

exports.getOrders = async (req, res, next) => {
    try {
        const query = `SELECT orders.id_order,
                              orders.quantity_order,
                              products.id_product,
                              products.name_product,
                              products.price_product
                         FROM orders
                   INNER JOIN products
                           ON products.id_product = orders.id_product;`
        const result = await mysql.execute(query);

        const response = {
            quantity: result.length,
            orders: result.map(order => {
                return {
                    id_order: order.id_order,
                    quantity_order: order.quantity_order,
                    product: {
                        id_product: order.id_product,
                        name_product: order.name_product,
                        price_product: order.price_product
                    },
                    request: {
                        type: 'GET',
                        description: 'Return order details',
                        url: process.env.URL_API + 'orders/' + order.id_order
                    }
                }
            })
        }
        return res.status(200).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM orders WHERE id_order = ?;'
        const result = await mysql.execute(query, [req.params.id_order]);

        if (result.length == 0) {
            return res.status(404).send({ message: 'Order not found' });
        }

        const response = {
            order: {
                id_order: result[0].id_order,
                id_product: result[0].id_product,
                quantity_order: result[0].quantity_order,
                request: {
                    type: 'GET',
                    description: 'Return all orders',
                    url: process.env.URL_API + 'orders'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postOrder = async (req, res, next) => {
    try {
        const queryProduct = 'SELECT * FROM products WHERE id_product = ?;'
        const resultProduct = await mysql.execute(queryProduct, [req.body.id_product]);

        if (resultProduct.length == 0) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const queryOrder = 'INSERT INTO orders (id_product, quantity_order) VALUES (?,?);'
        const resultOrder = await mysql.execute(queryOrder, [
            req.body.id_product,
            req.body.quantity_order
        ]);

        const response = {
            message: 'Order created successfully',
            createdOrder: {
                id_order: resultOrder.insertId,
                id_product: req.body.id_product,
                quantity_order: req.body.quantity_order,
                request: {
                    type: 'GET',
                    description: 'Return all orders',
                    url: process.env.URL_API + 'orders'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        var query = 'SELECT * FROM orders WHERE id_order = ?;'
        var result = await mysql.execute(query, [req.body.id_order]);

        if (result.length == 0) {
            return res.status(404).send({ message: 'Order not found' });
        }

        query = 'DELETE FROM orders WHERE id_order = ?;'
        await mysql.execute(query, [req.body.id_order]);

        const response = {
            message: 'Order deleted successfully',
            request: {
                type: 'POST',
                description: 'Create an order',
                url: process.env.URL_API + 'orders',
                body: {
                    id_product: 'Number',
                    quantity_order: 'Number'
                }
            }
        }
        return res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};