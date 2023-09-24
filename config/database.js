const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://ham:hamza123@cluster0.4mhm6qp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;
