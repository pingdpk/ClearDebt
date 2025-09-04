const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        contactId: {
            type: String
        },
        photoUrl: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);