const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
    {
        degree: String,
        institution: String,
        year: Number
    },
    { _id: false }
);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["jobseeker", "employer", "admin"],
        required: true
    },
    skills: [String],
    experience: String,
    education: educationSchema
});

module.exports = mongoose.model("User", userSchema);