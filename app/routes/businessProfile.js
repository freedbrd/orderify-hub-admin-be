const express = require('express');
const router = express.Router();

const {createBusinessProfile} = require('../controllers/businessProfile')

router.post('/', createBusinessProfile);

module.exports = router;