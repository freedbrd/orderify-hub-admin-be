const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const verifyToken = require('./app/middlewares/verify-token');
const authRoutes = require('./app/routes/authRoutes');
const businessProfileRoutes = require('./app/routes/businessProfile');
const productsRoutes = require('./app/routes/productRoutes');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}

const app = express();
const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the application on DB connection failure
    }
}



// Routes
app.use('/auth', authRoutes);
app.use('/businessProfile', verifyToken, businessProfileRoutes);
app.use('/products', verifyToken, productsRoutes);

// 404 Error Handling
app.use((req, res) => {
    res.status(404).json({
        not_found: true,
    });
});

connectToDatabase();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
});
