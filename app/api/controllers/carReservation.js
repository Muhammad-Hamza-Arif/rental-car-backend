const carReservationModel = require("../models/carReservation");

const create = async (req, res, next) => {
  try {
    const reservedCarData = {
      carData: req.body.carData,
      userData: req.body.userData,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      carId: req.body.carId,
      userId: req.body.userId,
    };
    console.log("reservedCarData", reservedCarData);
    await carReservationModel.create(reservedCarData);
    res.json({
      status: "success",
      message: "Car Reserved successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
const getAllReservedCarUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("123", userId);
    const userReservedCar = await carReservationModel.find({ userId: userId });
    res.json({
      status: "success",
      message: "Car list found by id!!!",
      data: { userReservedCar: userReservedCar },
    });
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  console.log(req.params);
  try {
    await carReservationModel.findByIdAndRemove(req.params.carId);

    res.json({
      status: "success",
      message: "Movie deleted successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUserReservedCar = async (req, res, next) => {
  try {
    const usersRservedCar = await carReservationModel.find({});
    const usersRservedCarList = usersRservedCar.map((car) => ({
      name: car.userData.name,
      startDate: car.startDate,
      endDate: car.endDate,
    }));
    res.json({
      status: "success",
      message: "Movie deleted successfully!!!",
      data: { usersRservedCarList: usersRservedCarList },
    });
  } catch (error) {
    next(error);
  }
};
const allCarReservedUser = async (req, res, next) => {
  try {
    const data = await carReservationModel.find({});
    const carsReservedUserList = data.map((car) => ({
      name: car.carData.name,
      startDate: car.startDate,
      endDate: car.endDate,
    }));
    res.json({
      status: "success",
      message: "Movie deleted successfully!!!",
      data: { carsReservedUserList: carsReservedUserList },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAllReservedCarUser,
  deleteById,
  getAllUserReservedCar,
  allCarReservedUser,
};
