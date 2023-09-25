const express = require('express');
const router = express.Router();

const {createUser, loginUser} = require('../controllers/authController')


router.post('/', createUser);
router.get('/', loginUser);

module.exports = router;