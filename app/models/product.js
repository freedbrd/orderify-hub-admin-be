const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    id_business_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businessProfile',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    images: [
        {
            type: String,
        },
    ],
    description: {
        type: String,
    },
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports = Product;
