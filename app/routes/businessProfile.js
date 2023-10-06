const express = require('express');
const router = express.Router();

const {
    createBusinessProfile,
    getAllBusinessProfiles,
    getBusinessProfileById,
    updateBusinessProfile,
    deleteBusinessProfile,
} = require('../controllers/businessProfile')

router
    .get('/', getAllBusinessProfiles)
    .get('/:id', getBusinessProfileById)
    .post('/', createBusinessProfile)
    .patch('/:id', updateBusinessProfile)
    .delete('/:id', deleteBusinessProfile)


module.exports = router;