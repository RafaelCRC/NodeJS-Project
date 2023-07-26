const mysql = require("../mysql");

exports.getProducts = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT * FROM products;');

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

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM products WHERE id_product = ?;'
        const result = await mysql.execute(query, [req.params.id_product]);
        
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
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postProduct = async (req, res, next) => {
    try {
        const query = 'INSERT INTO products (name_product, price_product, image_product) VALUES (?,?,?);';
        const result = await mysql.execute(query, [
            req.body.name_product, 
            req.body.price_product, 
            req.file.path
        ]);

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
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.patchProduct = async (req, res, next) => {
    try {
        const query = 'UPDATE products SET name_product = ?, price_product = ? WHERE id_product = ?;'
        await mysql.execute(query, [
            req.body.name_product, 
            req.body.price_product, 
            req.body.id_product
        ])

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
        return res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        var query = 'SELECT * FROM products WHERE id_product = ?;'
        var result = await mysql.execute(query, [req.body.id_product]);

        if (result.length == 0) {
            return res.status(404).send({ message: 'Product not found' });
        }

        query = 'DELETE FROM products WHERE id_product = ?;'
        await mysql.execute(query, [req.body.id_product]);

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
        return res.status(202).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};