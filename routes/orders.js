const express = require('express');
const router = express.Router();

// return all ordres
router.get('/', (req, res, rest) => {
    res.status(200).send({
        message: 'return orders.'
    });
});

// return a order by id
router.get('/:id_order', (req, res, rest) => {
    const id = req.params.id_order

    res.status(200).send({
        message: 'order details.',
        id: id
    });
});

// post an order
router.post('/', (req, res, rest) => {
    res.status(201).send({
        message: 'post an order.'
    });
});

// delete
router.delete('/', (req, res, rest) => {
    res.status(201).send({
        message: 'delete an order.'
    });
});

module.exports = router;