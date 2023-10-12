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
    const { userId } = req.user;

    try {
        const businessProfiles = await BusinessProfile.find({ userId }, 'id name type currency userId')
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
    const { userId } = req.user;

    try {
        const businessProfile = await BusinessProfile.findOne({ _id: id, userId }).lean();

        if (!businessProfile) {
            res.status(404).json({ message: 'Business Profile not found' });
            return;
        }

        const formattedProfile = {
            ...businessProfile,
            id: businessProfile._id
        }

        delete formattedProfile._id;
        delete formattedProfile.__v;

        res.json(formattedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateBusinessProfile = async (req, res) => {
    const { id } = req.params;
    const { name, type, currency } = req.body;
    const { userId } = req.user;

    try {
        const businessProfile = await BusinessProfile.findOneAndUpdate(
            { _id: id, userId },
            { name, type, currency },
            { new: true }
        );

        if (!businessProfile) {
            res.status(404).json({ message: 'Business Profile not found' });
            return;
        }

        res.json(businessProfile);
    } catch (error) {
        console.log
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteBusinessProfile = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        const deletedBusinessProfile = await BusinessProfile.findOneAndRemove({ _id: id, userId });

        if (!deletedBusinessProfile) {
            return res.status(404).json({ message: 'Business Profile not found' });
        }

        res.json(deletedBusinessProfile);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    createBusinessProfile,
    getAllBusinessProfiles,
    getBusinessProfileById,
    updateBusinessProfile,
    deleteBusinessProfile,
}