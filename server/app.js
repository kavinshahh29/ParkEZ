const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// routers
const userRouter = require("./routes/User");
const ParkingRouter = require("./routes/Parking");
const bookingRouter = require("./routes/Booking");
const PaymentRouter = require("./routes/Payment");

const corsConfig = {
  // origin: "https://parkezz.vercel.app",
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

app.use("/api/v1", ParkingRouter);

app.use("/api/v1", bookingRouter);

app.use("/api/v1", PaymentRouter);

app.use("/", (req, res) => {
  res
    .json({
      message: "Hello from the server!",
    })
    .status(200);
});

module.exports = app;
