const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/utils");


const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "login error",
        message: "invalid email / password",
      });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      const payload = {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
      const token= tokenGenerator(payload,false)
      const token_refresh=tokenGenerator(payload,true);
      
      return res.status(200).json({
        status: "login succesfully",
        data: user,
        token: token,
        token_refresh: token_refresh
      });
    } else {
      return res.status(200).json({
        status: "invalid email / password",
        message: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "login unsuccessfull",
      error: error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password, role, favourites } = req.body;
    const user = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: role,
      favourites: favourites,
    });
    await user.save();
    res.status(200).json({
      status: "user created succesfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "user not created",
      error: error.message,
    });
  }
};

module.exports = {
  addUser,
  userLogin,
};
