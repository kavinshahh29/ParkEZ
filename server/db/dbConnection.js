const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://kriscollege:Kris%40123@cluster0.3crjfvn.mongodb.net/"
    );
    console.log(`Database connected : ${connection.connection.host}`);
  } catch (err) {
    console.error("Error while connectin database ,", err);
  }
};

module.exports = dbConnection;
