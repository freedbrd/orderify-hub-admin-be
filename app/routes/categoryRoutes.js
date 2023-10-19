const express = require('express');
const router = express.Router();

const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    removeCategory,
} = require('../controllers/categoryController');


router.get('/', getAllCategories)
    .get('/:id', getCategoryById)
    .post('/', createCategory)
    .patch('/:id', updateCategory)
    .delete('', removeCategory)

module.exports = router;
