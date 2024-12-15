const User = require('../models/User');

exports.addUser = async (req, res) => {
    try {
        const { block, flatNo,userName, contactNo, userType, name } = req.body;


        const existingUser = await User.findOne({ block, flatNo });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists for this flat'
            });
        }

        const user = new User({
            block,
            flatNo,
            userName,
            name,
            contactNo,
            userType,
            isPreRegistered: true
        });

        await user.save();

        res.status(201).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error('Add User Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};