const express = require('express');
const router = express.Router();

const {
    getAllOrders,
    getOrdersByProductId,
    getOrdersByBusinessId,
} = require('../controllers/ordersController')

router
    .get('/', getAllOrders)
    .get('/:id', getOrdersByProductId)
    .get('/:id', getOrdersByBusinessId)

module.exports = router;