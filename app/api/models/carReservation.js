const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const CarReservationSchema = new Schema({
  carData: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  carId: {
    type: String,
  },
  userId: {
    type: String,
  },
});
module.exports = mongoose.model("CarReservation", CarReservationSchema);
