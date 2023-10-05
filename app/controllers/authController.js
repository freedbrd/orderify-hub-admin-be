const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        res.status(400).json({
            message: 'E-Mail or Password is missing.'
        });

        return;
    }

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            throw {
                status: 400,
                message: 'Email already in use'
            };
        }

        if(password.length < 6) {
            throw {
                status: 400,
                message: 'Min password length is 6'
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ email, password: hashedPassword, name });

        const validation = await user.validateSync();

        if (validation) {
            throw {
                status: 400,
                message: 'Signup data is not valid.',
                type: 'database',
                details: validation?.errors,
            }
        }
        
        await user.save();

        res.status(201).json({
            success: true
        });
    } catch (error) {
        console.log('error', error)
        res.status(error?. status ?? 500).json(error);
    }
}

const loginUser = async (req, res) => {
    const { email, password, remember } = req.body;

    if (!email) {
        return res.status(400).json({
            message: 'Email is missing'
        })
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw {
                status: 401,
                message: 'Invalid credentials'
            }
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw {
                status: 401,
                message: 'Invalid credentials'
            }
        }

        const token = jwt.sign({ userId: user._id }, process.env['JWT_SECRET'], { expiresIn: remember ? '3d' : '1h' });

        const userObject = {
            id: user?._id,
            ...user._doc,
        }

        delete userObject?._id;
        delete userObject?.__v;
        delete userObject?.password;

        res.status(200).json({ token, user: userObject });
    } catch (error) {
        console.log('error', error)
        res.status(error?. status ?? 500).json(error);
    }
}

module.exports = { createUser, loginUser }