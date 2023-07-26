const mysql = require("../mysql").pool;

exports.getProducts = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM products',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    quantity: result.length,
                    products: result.map(prod => {
                        return {
                            id_product: prod.id_product,
                            name_product: prod.name_product,
                            price_product: prod.price_product,
                            image_product: prod.image_product,
                            request: {
                                type: 'GET',
                                description: 'Return product details',
                                url: process.env.URL_API + 'products/' + prod.id_product
                            }
                        }
                    })
                }
                
                return res.status(200).send(response);
            }
        );
    });
}

exports.getProduct = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM products WHERE id_product = ?',
            [req.params.id_product],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Product not found'
                    });
                }
                const response = {
                    product: {
                        id_product: result[0].id_product,
                        name_product: result[0].name_product,
                        price_product: result[0].price_product,
                        image_product: result[0].image_product,
                        request: {
                            type: 'GET',
                            description: 'Return all products',
                            url: process.env.URL_API + 'products'
                        }
                    }
                }

                return res.status(201).send({ response: response});
            }
        );
    });
}

exports.postProduct = (req, res, next) => {
    console.log(req.user);
    console.log(req.file);
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO products (name_product, price_product, image_product) VALUES (?,?,?)',
            [req.body.name_product, req.body.price_product, req.file.path],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}
                const response = {
                    message: 'Product created successfully',
                    createdProduct: {
                        id_product: result.insertId,
                        name_product: req.body.name_product,
                        price_product: req.body.price_product,
                        image_product: req.file.path,
                        request: {
                            type: 'GET',
                            description: 'Return all products',
                            url: process.env.URL_API + 'products'
                        }
                    }
                }

                return res.status(201).send({ response: response});
            }
        );
    });
}

exports.patchProduct = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `UPDATE products
                SET name_product  = ?,
                    price_product = ?
              WHERE id_product    = ?`,
            [
                req.body.name_product, 
                req.body.price_product, 
                req.body.id_product
            ],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                const response = {
                    message: 'Product updated successfully',
                    updatedProduct: {
                        id_product: req.body.id_product,
                        name_product: req.body.name_product,
                        price_product: req.body.price_product,
                        request: {
                            type: 'GET',
                            description: 'Return product details',
                            url: process.env.URL_API + 'products/' + req.body.id_product
                        }
                    }
                }

                return res.status(202).send({ response: response});
            }
        );
    });
}

exports.deleteProduct = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'DELETE FROM products WHERE id_product = ?',
            [req.body.id_product],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                const response = {
                    message: 'Product deleted successfully',
                    request: {
                        type: 'POST',
                        description: 'Create a product',
                        url: process.env.URL_API + 'products',
                        body: {
                            name_product: 'String',
                            price_product: 'Number'
                        }
                    }
                }

                return res.status(202).send({ response: response});
            }
        );
    });
}