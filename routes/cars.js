const express = require("express");
const router = express.Router();
const carController = require("../app/api/controllers/cars");
router.get("/", carController.getAll);
router.post("/", carController.create);
router.get("/:carId", carController.getCarById);
// router.get('/:movieId', movieController.getById);
router.put("/:carId", carController.updateById);
router.delete("/:carId", carController.deleteById);
router.get("/reservedcar/:carId", carController.reservedCarFetch);
router.put(
  "/reservedcaravailableupdate/:carId",
  carController.reservedCarAvailableUpdate
);
router.put("/search?key=", carController.searchCar);
module.exports = router;
