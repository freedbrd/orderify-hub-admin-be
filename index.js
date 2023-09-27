const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}


const authRoutes = require('./app/routes/authRoutes')

const mongoose = require("mongoose");

const app = express();
app.use(morgan('combined'))


async function run() {
    try {
        await mongoose.connect(process.env['DB_CONNECTION_STRING']);

        app.listen(process.env.PORT, () => {

            console.log(`Server is listening on ${process.env.PORT} port`)
        })
    } catch (err) {
        console.log(err)
    }
}

run();


app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({
        not_found: true
    })
})