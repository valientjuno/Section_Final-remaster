const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const initDb = async (callback) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB with Mongoose");
    callback(null);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    callback(err);
  }
};

module.exports = { initDb };
