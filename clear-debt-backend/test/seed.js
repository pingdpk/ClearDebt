require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/User");
// const Debtman = require("./models/Debtman");
// const Transaction = require("./models/Transaction");
// const PaymentMode = require("./models/PaymentMode");


async function seed() {
  try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");

        // 1️⃣ Clear existing data
        await Promise.all([
        User.deleteMany(),
        //   Debtman.deleteMany(),
        //   Transaction.deleteMany(),
        //   PaymentMode.deleteMany()
        ]);

            // 2️⃣ Create User
    const user = await User.create({
      _id: new mongoose.Types.ObjectId("65b9f1000000000000000001"),
      name: "Deepak",
      phone: "+971500000000",
      email: "deepak@cleardebt.123"
    });

        console.log("✅ Test data seeded successfully");
        process.exit(0);
  } catch (err) {
        console.error("❌ Seeding failed", err);
        process.exit(1);
    }
}

seed();
