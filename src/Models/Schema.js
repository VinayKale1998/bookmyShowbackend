const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const seatSchema = new Schema({
  A1: { type: Number, required: [true, "a1 not provided"] },
  A2: { type: Number, required: [true, "a2 not provided"] },
  A3: { type: Number, required: [true, "a3 not provided"] },
  A4: { type: Number, required: [true, "a4 not provided"] },
  D1: { type: Number, required: [true, "d1 not provided"] },
  D2: { type: Number, required: [true, "d1 not provided"] },
});

const booking = new Schema({
  movie: {
    type: String,
    required: [true, "movie name not defined"],
    enum: ['Suraj par mangal bhari', 'Tenet', 'The war with grandpa', 'The personal history of David Copperfield', 'Come Play'],
  },
  seats: {
    type: seatSchema,
    required: [true, "seats not provided"],
  },
  slot: { type: String, required: [true, "slot not provided"], immutable: true },
  createdOn: {
    type: Date,
    required: [true, "creation time not generated"],
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
});

booking.pre("save", function (next) {
  next();
  // next();
  // throw new Error("failed save")
  //if you dont use your next, save wont go through, you can throw an error which will caught by your code to confirm
});

module.exports = mongoose.model("Booking", booking);
