const mysql = require("../mysql").pool;

exports.getOrders = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query( `SELECT orders.id_order, 
                            orders.quantity_order, 
                            products.id_product, 
                            products.name_product, 
                            products.price_product
                       FROM orders
                 INNER JOIN products
                         ON products.id_product = orders.id_product;`,
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
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
                                url: 'http://localhost:3000/orders/' + order.id_order
                            }
                        }
                    })
                }
                
                return res.status(200).send(response);
            }
        );
    });
}

exports.getOrder = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM orders WHERE id_order = ?',
            [req.params.id_order],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Order not found'
                    });
                }
                const response = {
                    order: {
                        id_order: result[0].id_order,
                        id_product: result[0].id_product,
                        quantity_order: result[0].quantity_order,
                        request: {
                            type: 'GET',
                            description: 'Return all orders',
                            url: 'http://localhost:3000/orders'
                        }
                    }
                }

                return res.status(201).send({ response: response});
            }
        );
    });
}

exports.postOrder = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM products WHERE id_product = ?',
        [req.body.id_product],
        (error, result, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (result.length == 0) {
                return res.status(404).send({
                    message: 'Product not found'
                });
            }
            conn.query(
                'INSERT INTO orders (id_product, quantity_order) VALUES (?,?)',
                [req.body.id_product, req.body.quantity_order],
                (error, result, fields) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error })}
                    const response = {
                        message: 'Order created successfully',
                        createdOrder: {
                            id_order: result.insertId,
                            id_product: req.body.id_product,
                            quantity_order: req.body.quantity_order,
                            request: {
                                type: 'GET',
                                description: 'Return all orders',
                                url: 'http://localhost:3000/orders'
                            }
                        }
                    }
    
                    return res.status(201).send({ response: response});
                }
            );
        });
    });
}

exports.deleteOrder = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'DELETE FROM orders WHERE id_order = ?',
            [req.body.id_order],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                const response = {
                    message: 'Order deleted successfully',
                    request: {
                        type: 'POST',
                        description: 'Create an order',
                        url: 'http://localhost:3000/orders',
                        body: {
                            id_product: 'Number',
                            quantity_order: 'Number'
                        }
                    }
                }

                return res.status(202).send({ response: response});
            }
        );
    });
}