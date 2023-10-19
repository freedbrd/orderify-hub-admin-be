const Joi = require('joi');
const BusinessProfile = require('../models/businessProfile')
const formatResponse = require('../helpers/formatResponse');

const businessProfileValidationSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid('product', 'service').required(),
    currency: Joi.string().required(),
    userId: Joi.string().required(),
});

const createBusinessProfile = async (req, res) => {
  try {
    const { error } = businessProfileValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: 'Invalid business profile data',
        details: error.details,
      });
    }

    const businessProfileData = req.body;
    const { userId } = req.user;

    const businessProfile = new BusinessProfile({
      ...businessProfileData,
      userId,
    });

    await businessProfile.save();

    res.json(formatResponse(businessProfile._doc));

  } catch (error) {
    console.error('Error:', error);  // Consider using a better logging mechanism
    res.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    });
  }
};

const getAllBusinessProfiles = async (req, res) => {
  const { userId } = req.user;

  try {
    const businessProfiles = await BusinessProfile.find({ userId }, 'id name type currency userId')
    .sort({ createdAt: -1 })
    .lean();

    const formattedProfiles = businessProfiles.map(profile => formatResponse(profile));

    res.json(formattedProfiles);
  } catch (error) {
    console.error('Error:', error);  // Consider using a better logging mechanism
    res.status(500).json({
      message: error.message || 'Internal Server Error',
    });
  }
};


const getBusinessProfileById = async (req, res) => {
  const {id} = req.params;
  const {userId} = req.user;

  try {
    const businessProfile = await BusinessProfile.findOne({
      _id: id,
      userId
    }).lean();

    if (!businessProfile) {
      res.status(404).json({
        message: 'Business Profile not found'
      });

      return;
    }

    res.json(formatResponse(businessProfile));


  } catch (error) {
    console.error('Error:', error);

    res.status(500).json({
      message: error.message || 'Internal Server Error',
    });
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
    ).lean();

    if (!businessProfile) {
      return res.status(404).json({ message: 'Business Profile not found' });
    }

    res.json(formatResponse(businessProfile));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

const deleteBusinessProfile = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const deletedBusinessProfile = await BusinessProfile.findOneAndRemove({ _id: id, userId }).lean();

    if (!deletedBusinessProfile) {
      return res.status(404).json({ message: 'Business Profile not found' });
    }

    res.json(formatResponse(deletedBusinessProfile));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};


module.exports = {
    createBusinessProfile,
    getAllBusinessProfiles,
    getBusinessProfileById,
    updateBusinessProfile,
    deleteBusinessProfile,
}