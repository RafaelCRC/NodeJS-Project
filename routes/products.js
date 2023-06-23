const express = require('express');
const router = express.Router();

// return all products
router.get('/', (req, res, rest) => {
    res.status(200).send({
        message: 'Using GET inside products route.'
    });
});

// return a product by id
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

// post a product
router.post('/', (req, res, rest) => {
    res.status(201).send({
        message: 'Using POST inside products route.'
    });
});

// patch
router.patch('/', (req, res, rest) => {
    res.status(201).send({
        message: 'Using PATCH inside products route.'
    });
});

// delete
router.delete('/', (req, res, rest) => {
    res.status(201).send({
        message: 'Using DELETE inside products route.'
    });
});



module.exports = router;