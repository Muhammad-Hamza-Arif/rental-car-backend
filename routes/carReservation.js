const express = require("express");
const router = express.Router();
const carReservationController = require("../app/api/controllers/carReservation");
router.post("/", carReservationController.create);
router.get("/getall/:userId", carReservationController.getAllReservedCarUser);
router.get("/", carReservationController.getAllUserReservedCar);
router.delete("/:carId", carReservationController.deleteById);
router.get("/getallcars/", carReservationController.allCarReservedUser);
module.exports = router;
