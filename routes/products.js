const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM products',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                return res.status(200).send({ response: result});
            }
        );
    });
});

router.get('/:id_product', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM products WHERE id_product = ?',
            [req.params.id_product],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                return res.status(200).send({ response: result});
            }
        );
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO products (name_product, price_product) VALUES (?,?)',
            [req.body.name_product, req.body.price_product],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                return res.status(201).send({
                    message: 'Product created successfully.',
                    id_product: result.insertId
                });
            }
        );
    });
});

router.patch('/', (req, res, next) => {
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

                return res.status(202).send({
                    message: 'Product updated successfully.'
                });
            }
        );
    });
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM products WHERE id_product = ?`,
            [req.body.id_product],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                return res.status(202).send({
                    message: 'Product deleted successfully.'
                });
            }
        );
    });
});



module.exports = router;