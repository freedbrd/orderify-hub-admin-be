const Category = require('../models/category');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    const { title, businessProfileId } = req.body;
    try {
        const category = new Category({
            title,
            businessProfileId,
        });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { title, businessProfileId } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { title, businessProfileId },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Remove a category by ID
const removeCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndRemove(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(deletedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    removeCategory,
};
