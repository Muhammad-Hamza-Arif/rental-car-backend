const carModel = require("../models/cars");

const create = async (req, res, next) => {
  try {
    const newCar = {
      name: req.body.name,
      model: req.body.model,
      color: req.body.color,
      available: req.body.available,
      userId: req.body.userId,
    };
    console.log("car", newCar);
    await carModel.create(newCar);
    res.json({
      status: "success",
      message: "Movie added successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
const getCarById = async (req, res, next) => {
  try {
    const userId = req.params.carId;
    console.log("123", userId);
    const cars = await carModel.find({ userId: userId });
    res.json({
      status: "success",
      message: "Car list found by id!!!",
      data: { cars: cars },
    });
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const cars = await carModel.find({});
    const carsList = cars.map((car) => ({
      id: car._id,
      name: car.name,
      model: car.model,
      color: car.color,
      available: car.available,
    }));
    res.json({
      status: "success",
      message: "Movies list found!!!",
      data: { cars: carsList },
    });
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  console.log(req.params);
  try {
    await carModel.findByIdAndRemove(req.params.carId);

    res.json({
      status: "success",
      message: "Movie deleted successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  console.log("hello >>>>>>", req.body);
  try {
    await carModel.findByIdAndUpdate(req.params.carId, {
      name: req.body.name,
      model: req.body.model,
      color: req.body.color,
      available: req.body.available,
    });

    res.json({
      status: "success",
      message: "Movie updated successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
const reservedCarFetch = async (req, res, next) => {
  console.log("hello ", req.body);
  try {
    const reservedCarData = await carModel.findById(req.params.carId);
    res.json({
      status: "success",
      message: "Movie updated successfully!!!",
      data: { reservedCarData: reservedCarData },
    });
  } catch (error) {
    next(error);
  }
};
const reservedCarAvailableUpdate = async (req, res, next) => {
  console.log(req.body.available);
  try {
    await carModel.findByIdAndUpdate(req.params.carId, {
      available: req.body.available,
    });

    res.json({
      status: "success",
      message: "CarAvailable updated successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
const searchCar = async (req, res, next) => {
  const { key } = req.query;
  console.log("keyy===>", key);
  try {
    const carInfo = await carModel.find({
      $or: [
        { name: { $regex: key } },
        { model: { $regex: key } },
        { color: { $regex: key } },
      ],
    });
    res.json({
      status: "success",
      message: "car found!!!",
      data: { cars: carInfo },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  create,
  getAll,
  deleteById,
  updateById,
  getCarById,
  reservedCarFetch,
  reservedCarAvailableUpdate,
  searchCar,
};
