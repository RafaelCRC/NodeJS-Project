const express = require('express');
const router = express.Router();

router.get('/', (req, res, rest) => {
    res.status(200).send({
        message: 'Using GET inside products route.'
    });
});

router.get('/:id_produto', (req, res, rest) => {
    const id = req.params.id_produto

    if (id === 'special') {
        res.status(200).send({
            message: 'special ID.',
            id: id
        });
    } else {
        res.status(200).send({
            message: 'You passed an id.',
            id: id
        });
    }
});

router.post('/', (req, res, rest) => {
    const product = {
        product_name: req.body.product_name,
        product_price: req.body.product_price
    };

    res.status(201).send({
        message: 'Using POST inside products route.',
        createdProduct: product
    });
});

router.patch('/', (req, res, rest) => {
    res.status(201).send({
        message: 'Using PATCH inside products route.'
    });
});

router.delete('/', (req, res, rest) => {
    res.status(201).send({
        message: 'Using DELETE inside products route.'
    });
});



module.exports = router;