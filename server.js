const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cars = require("./routes/cars");
const users = require("./routes/users");
const carReservation = require("./routes/carReservation");
const mongoose = require("mongoose"); //database configuration
var jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
app.set("secretKey", "nodeRestApi"); // jwt secret token
// connection to mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.json({ tutorial: "Build REST API with node.js" });
});
// public route
app.use("/users", users);
// private route
app.use("/carreservation", validateUser, carReservation);
app.use("/cars", validateUser, cars);

// app.get('/favicon.ico', function(req, res) {
//     res.sendStatus(204);
// });
function validateUser(req, res, next) {
  console.log("validatorToken", req.headers["x-access-token"]);
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    function (err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);
