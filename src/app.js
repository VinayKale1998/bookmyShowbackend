const express = require("express");
const routes = require("express").Router;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Booking = require("../src/Models/Schema");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) ;
 
//connecting to the database
try {
  mongoose.connect(
    "mongodb+srv://vinaykale1999:vinaykale@cluster0.mktz8ju.mongodb.net/BookMyShow?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  console.log("Connected to the DB");
} catch (err) {
  console.log(
    "Error occured while establishing a connection with the database",
    err.message
  );
}

//API for booking a movie------------------------------------------------------//
app.post("/api/booking", async (req, res) => {
  console.log(req.body);
  const booking = new Booking({
    movie: req.body.movie,
    seats: req.body.seats,
    slot: req.body.slot,
  });
  try {
    await booking.save();
    console.log("Your booking is confirmed");
    return res.status(200).send({ message: "Your booking has been confirmed" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: `${err.message}` });
  }
});

//API for getting the last booking-------------------------------------------------//
app.get("/api/booking", async (req, res) => {
  try {
    const booking = await Booking.find().sort({ createdOn: -1 }).limit(1);
    if (booking[0]) {
      res.status(200).send(booking[0]);
    } else {
      res.status(200).send({ message: "No previous bookings found" });
    }
  } catch (err) {
    res.status(500).send({ message: "error while getting the last booking" });
    console.log("error while getting the last booking", err);
  }
});

//--------------------------------------spawn code block-----------------------------
const PORT = 8080;
app.listen(PORT, (err) => {
  if (!err) console.log(`Server Listening to port ${PORT}`);
  else console.log("Server failed to launch");
});
