const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { name, skills, experience, education } = req.body;

        if (name !== undefined) {
            user.name = name;
        }

        if (skills !== undefined) {
            user.skills = skills;
        }

        if (experience !== undefined) {
            user.experience = experience;
        }

        if (education !== undefined) {
            user.education = education;
        }

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                skills: user.skills,
                experience: user.experience,
                education: user.education
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};