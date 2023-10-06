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

const getAllBusinessProfiles = async (req, res) => {
    try {
        const businessProfiles = await BusinessProfile.find({}, 'id name type currency userId')
            .sort({ createdAt: -1 })
            .lean();
        
        const formattedProfiles = businessProfiles.map(profile => {
            profile.id = profile._id;
            delete profile._id;
            return profile;
        });

        res.json(formattedProfiles);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getBusinessProfileById = async (req, res) => {
    const { id } = req.params;
    try {
        const businessProfile = await BusinessProfile.findById(id);
        if (!businessProfile) {
            res.status(404).json({ message: 'Business Profile not found' });
            return;
        }
        res.json(businessProfile);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateBusinessProfile = async (req, res) => {
    const { id } = req.params;
    const { name, type, currency } = req.body;

    try {
        const businessProfile = await BusinessProfile.findByIdAndUpdate(
            id,
            { name, type, currency },
        );

        if (!businessProfile) {
            res.status(404).json({ message: 'Business Profile not found' });
            return;
        }

        res.json(businessProfile);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteBusinessProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBusinessProfile = await BusinessProfile.findByIdAndRemove(id);

        if (!deletedBusinessProfile) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(deletedBusinessProfile);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createBusinessProfile,
    getAllBusinessProfiles,
    getBusinessProfileById,
    updateBusinessProfile,
    deleteBusinessProfile,
}