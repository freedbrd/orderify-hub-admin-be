const express = require('express');
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByBusinessProfileId,
} = require('../controllers/productController')

router
    .get('/', getAllProducts)
    .get('/:id', getProductById)
    .post('/', createProduct)
    .patch('/:id', updateProduct)
    .delete('/:id', deleteProduct)
    .get('/business/:businessProfileId', getProductsByBusinessProfileId);

module.exports = router;