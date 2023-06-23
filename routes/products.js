const express = require('express');
const router = express.Router();

router.get('/', (req, res, rest) => {
    res.status(200).send({
        message: 'Using GET inside products route.'
    });
});

router.get('/:id_product', (req, res, rest) => {
    const id = req.params.id_product

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
        name_product: req.body.name_product,
        price_product: req.body.price_product
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