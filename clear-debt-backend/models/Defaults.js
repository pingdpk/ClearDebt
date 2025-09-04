const mongoose = require("mongoose");

const defaults = new mongoose.Schema(
    {
        general: {

        },
        user: {
            paymentModes: {
                type: [String],
                isDefault: true,
                required: true
            }
        }
    }
);

module.exports = Mongoose.Model("Defaults", defaults);


//To be inserted to DB
// [
//   "Cash",
//   "Bank Transfer",
//   "Google Pay",
//   "PhonePe",
//   "Card Payment"
// ]