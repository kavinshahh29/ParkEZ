const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv')

dotenv.config({path : './.env'})

// routers
const userRouter = require("./routes/User");
const ParkingRouter = require("./routes/Parking");

const corsConfig = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

app.use("/api/v1", ParkingRouter);

app.use("/", (req, res) => {
  res
    .json({
      message: "Hello from the server!",
    })
    .status(200);
});

module.exports = app;
