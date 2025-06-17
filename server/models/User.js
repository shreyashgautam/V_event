// models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        
        trim: true
    },
    regNo: {
        type: String,
        required: function () {
            return this.role === "student";
        },
        unique: function () {
            return this.role === "student";
        },
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "coordinator", "admin"],
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
