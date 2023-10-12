const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    businessProfileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businessProfile',
        required: true,
    },
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
