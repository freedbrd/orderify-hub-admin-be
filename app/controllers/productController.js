const Product = require('../models/product');

// Create a new product
const createProduct = async (req, res) => {
    const { title, price, id_business_profile } = req.body;

    try {
        // Check if any required fields are empty
        if (!title || !price || !id_business_profile) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = new Product({
            title,
            price,
            id_business_profile,
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;

    try {
        // Check if any required fields are empty
        if (!title || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            {
                title,
                price,
            },
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndRemove(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
