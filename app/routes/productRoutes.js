const express = require('express');
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController')

router
    .get('/', getAllProducts)
    .get('/:id', getProductById)
    .post('/', createProduct)
    .patch('/:id', updateProduct)
    .delete('/', deleteProduct)

module.exports = router;