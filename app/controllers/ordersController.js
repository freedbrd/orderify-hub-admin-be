const Order = require('../models/order');

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get orders by product_id
const getOrdersByProductId = async (req, res) => {
    const { product_id } = req.params;

    try {
        const orders = await Order.find({ product_id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get orders by business_id
const getOrdersByBusinessId = async (req, res) => {
    const { business_id } = req.params;

    try {
        const orders = await Order.find({ business_id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllOrders,
    getOrdersByProductId,
    getOrdersByBusinessId,
};
