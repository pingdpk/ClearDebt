const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        debtmanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        currency: {
            type: String,
            required: true,
            uppercase: true
        },
        type: {
            type: String,
            required: true,
            enum: ["IN", "OUT"] //in = debit = recieved, out = credit = gone from the acc
        },
        paymentModeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PaymentMode",
            required: true
        },
        note: {
            type: String,
            max: 30
        },
        transactionDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);