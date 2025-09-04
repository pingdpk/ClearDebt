const mongoose = require("mongoose");

const paymentModeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {                 //Payment mode name
            type: String,
            required: true,
            trim: true
        },
        isDefault: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

// prevent duplicate mode names per user
paymentModeSchema.index({userId: 1,name: 1},{unique: true});

module.exports = mongoose.model("PaymentMode", paymentModeSchema);