const BusinessProfile = require('../models/businessProfile')

const createBusinessProfile = async (req, res) => {
    const businessProfileData = req.body;
    const {userId} = req.user;

    try {
        const businessProfile = new BusinessProfile({
            ...businessProfileData,
            userId
        });

        const validation = businessProfile.validateSync();

        if (validation) {
            throw {
                status: 400,
                message: 'Invalid business profile data',
                details: validation?.errors,
            }
        }

        await businessProfile.save();

        

        const businessProfileObject = {
            id: businessProfile?._id,
            ...businessProfile._doc,
        }

        delete businessProfileObject?._id;
        delete businessProfileObject?.__v;
        delete businessProfileObject?._doc;

        res.json(businessProfileObject)

    } catch(error) {
        console.log('error', error)
        res.status(error?. status ?? 500).json(error);
    }
}

module.exports = {
    createBusinessProfile
}