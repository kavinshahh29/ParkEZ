const Booking = require("../models/Booking.js");
const User = require("../models/User.js");
const mongoose = require("mongoose");
const Parking = require("../models/Parking.js");
//const stripe = require("../app.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Parking Charge",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/parkings`,
      cancel_url: "http://localhost:5173",
    });

    console.log(session, session.id);

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
};
