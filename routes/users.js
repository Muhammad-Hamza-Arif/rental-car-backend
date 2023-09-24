const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");
router.post("/register", userController.create);
router.post("/authenticate", userController.authenticate);
router.get("/getallusers", userController.getAllUsers);
router.delete("/:userId", userController.deleteById);
router.put("/:userId", userController.updateById);
router.get(
  "/getllserseservedar/:carId",
  userController.getAllUsersNameReservedCar
);
module.exports = router;
