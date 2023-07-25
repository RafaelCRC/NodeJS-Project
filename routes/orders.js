const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders-controller');

router.get('/', ordersController.getOrders);

router.get('/:id_order', ordersController.getOrder);

router.post('/', ordersController.postOrder);

router.delete('/', ordersController.deleteOrder);

module.exports = router;