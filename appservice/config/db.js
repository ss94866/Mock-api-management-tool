const mongoose = require("mongoose");
require("dotenv");

async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(`DB connected. ${conn.connection.host}`);
    return conn
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
}

module.exports = connectDb;
