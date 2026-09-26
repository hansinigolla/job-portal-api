const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

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


const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { name, email, role } = req.body;

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        res.json({
            message: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.json(jobs);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.json({
            message: "Job removed successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllJobs,
    deleteJob
};