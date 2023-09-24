const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const CarSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  model: {
    type: String,
    trim: true,
    required: true,
  },
  color: {
    type: String,
    require: true,
  },
  available: {
    type: Boolean,
    require: true,
  },
  userId: {
    type: String,
  },
});
module.exports = mongoose.model("Cars", CarSchema);
