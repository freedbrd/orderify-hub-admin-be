const Product = require('../models/product');

// Create a new product
const createProduct = async (req, res) => {
    const { title, price, id_business_profile, categoryId, description, images } = req.body;
    const { userId } = req.user; // Get the user's ID from the request

    try {
        // Check if any required fields are empty
        if (!title || !price || !id_business_profile) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = new Product({
            title,
            price,
            id_business_profile,
            userId,
            description,
            categoryId: categoryId || null,
            images,
        });

        await product.save();

        const formattedProduct = {
            id: product._id,
            ...product._doc,
        }

        delete formattedProduct._id;
        delete formattedProduct.__v;
        delete formattedProduct?._doc;

        res.status(201).json(formattedProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    const { userId } = req.user; // Get the user's ID from the request

    try {
        const products = await Product.find({ userId }).lean();

        const formatteProducts = products.map(product => {
            product.id = product._id;
            delete product._id;
            return product;
        });


        res.json(formatteProducts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user; // Get the user's ID from the request

    try {
        const product = await Product.findOne({ _id: id, userId }).lean();

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const formatteProduct = {
            id: product._id,
            ...product
        }

        delete formatteProduct._id
        delete formatteProduct.__v

        res.json(formatteProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price, description, images  } = req.body;
    const { userId } = req.user; // Get the user's ID from the request

    try {
        // Check if any required fields are empty
        if (!title || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = await Product.findOneAndUpdate(
            { _id: id, userId }, // Match both ID and userId
            {
                title,
                price,
                description,
                images
            },
            { new: true }
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
    const { userId } = req.user; // Get the user's ID from the request

    try {
        const deletedProduct = await Product.findOneAndRemove({ _id: id, userId });

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductsByBusinessProfileId = async (req, res) => {
    const { businessProfileId } = req.params;
    const { userId } = req.user; // Get the user's ID from the request

    try {
        const products = await Product.find({ id_business_profile: businessProfileId, userId }).lean();

        const formatteProducts = products.map(product => {
            product.id = product._id;
            delete product._id;
            delete product.__v;
            return product;
        });
        
        res.json(formatteProducts);
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
    getProductsByBusinessProfileId
};
