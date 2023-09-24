const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function (req, res, next) {
    console.log(req.body);
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    console.log("data in backeb=d", data);
    userModel
      .create(data)
      .then((result) => {
        res.send({ status: 200, msg: "User created successfully" });
      })
      .catch((err) => {
        res.send({ status: 500, msg: "Error creating user" });
      });
  },
  authenticate: async (req, res, next) => {
    console.log("request -------------->", req.body);
    try {
      const userInfo = await userModel.findOne({ email: req.body.email });
      if (!userInfo) {
        res.json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null,
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userInfo.password
      );
      console.log("isPassword : >>>>>", isPasswordValid);
      if (isPasswordValid) {
        const token = jwt.sign({ id: userInfo._id }, req.app.get("secretKey"), {
          expiresIn: "1h",
        });
        res.json({
          status: "success",
          message: "User found!!!",
          data: { user: userInfo, token: token },
        });
      } else {
        res.json({
          status: "error",
          message: "Invalid emailpassword!!!",
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userModel.find({});
      const userList = users.map((users) => ({
        id: users._id,
        name: users.name,
        email: users.email,
        role: users.role,
      }));
      res.json({
        status: "success",
        message: "User list found!!!",
        data: { users: userList },
      });
    } catch (error) {
      next(error);
    }
  },
  deleteById: async (req, res, next) => {
    console.log(req.params);
    try {
      await userModel.findByIdAndRemove(req.params.userId);

      res.json({
        status: "success",
        message: "User deleted successfully!!!",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
  updateById: async (req, res, next) => {
    console.log("hello >>>>>>", req.body);
    try {
      await userModel.findByIdAndUpdate(req.params.userId, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      res.json({
        status: "success",
        message: "User updated successfully!!!",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllUsersNameReservedCar: async (req, res, next) => {
    try {
      const userData = await userModel.findById(req.params.carId);
      res.json({
        status: "success",
        message: "Movie updated successfully!!!",
        data: { userData: userData },
      });
    } catch (error) {
      next(error);
    }
  },
};
