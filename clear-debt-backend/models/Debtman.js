const mongoose = require("mongoose");
const User = require("./User");

const debtmanSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        user: User //I changed as per my convenient 
    }
);

module.exports = mongoose.model("Debtman", debtmanSchema)