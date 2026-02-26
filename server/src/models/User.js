const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
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
            required : true
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN", "SUPER_ADMIN"],
            default: "USER"
        },
        credits: {
            type: Number,
            default: 100
        },
        isPremium: {
            type: Boolean,
            default: false
        },

    },
    {timestamps: true}
);

module.exports = mongoose.model("User" , UserSchema);