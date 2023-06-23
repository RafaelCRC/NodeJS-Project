const express = require('express');
const router = express.Router();

router.get('/', (req, res, rest) => {
    res.status(200).send({
        message: 'return orders.'
    });
});

router.get('/:id_order', (req, res, rest) => {
    const id = req.params.id_order

    res.status(200).send({
        message: 'order details.',
        id: id
    });
});

router.post('/', (req, res, rest) => {
    res.status(201).send({
        message: 'post an order.'
    });
});

router.delete('/', (req, res, rest) => {
    res.status(201).send({
        message: 'delete an order.'
    });
});

module.exports = router;