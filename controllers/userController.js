const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/utils");
const Movie = require("../models/movieModel");
const sendEmail = require("../services/emailsignup");

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
      };
      const token = tokenGenerator(payload, false);
      const token_refresh = tokenGenerator(payload, true);

      return res.status(200).json({
        status: "login succesfully",
        data: user,
        token: token,
        token_refresh: token_refresh,
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
    sendEmail(
      user.email,
      "Gracias por registrarte en FilmAPP",
      "Por el momento esto es un proyecto de backend de un alumno de codespace pero quien sabe.... quizas algun dia se convierta en una aplicacion real. Saludos"
    );
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

const addToFavourites = async (req, res) => {
  try {
    const userId = req.payload.userId;
    if (!userId) {
      return res.status(204).json({
        status: "success",
        message: "user ID not found",
      });
    }
    const movieToAdd = req.params.id;

    if (!movieToAdd) {
      return res.status(204).json({
        status: "success",
        message: "movie ID not found",
      });
    }
    const user = await User.findById(userId);
    console.log(user);
    const isIncluded = user.favourites.includes(movieToAdd);
    console.log(isIncluded);
    if (!isIncluded) {
      user.favourites.push(movieToAdd);
      await user.save();

      return res.status(200).json({
        status: "success",
        data: user,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "movie already exist in user favourite",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "favourite not added",
      error: error.message,
    });
  }
};
const editUser = async (req, res) => {
  try {
    const userId = req.payload.userId;
    const { name, email, password, role } = req.body;
    const hashedPassword = bcrypt(password, 10);
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, hashedPassword, role },
      { new: true }
    );

    await user.save();
    if (!userId) {
      return res.status(204).json({
        status: "success",
        message: "user ID not found",
        error: error.message,
      });
    }
    if (!movieToDelete) {
      return res.status(204).json({
        status: "success",
        message: "movie ID not found",
        error: error.message,
      });
    }
    console.log(userResult);
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "favourite not deleted",
      error: error.message,
    });
  }
};

const deleteFavourite = async (req, res) => {
  try {
    const userId = req.payload.userId;
    const movieToDelete = req.params.id;
    const userResult = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favourites: movieToDelete },
      },
      { new: true }
    );

    if (!userId) {
      return res.status(204).json({
        status: "success",
        message: "user ID not found",
        error: error.message,
      });
    }
    if (!movieToDelete) {
      return res.status(204).json({
        status: "success",
        message: "movie ID not found",
        error: error.message,
      });
    }
    console.log(userResult);
    return res.status(200).json({
      status: "success",
      data: userResult,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "favourite not deleted",
      error: error.message,
    });
  }
};

const getFavouriteFromUser = async (req, res) => {
  try {
    const userId = req.payload.userId;

    if (!userId) {
      return res.status(204).json({
        status: "success",
        message: "user ID not found",
        error: error.message,
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(204).json({
        status: "success",
        message: "user ID not found",
        error: error.message,
      });
    }
    const favourites = user.favourites;
    if (favourites.lenght === 0) {
      return res.status(204).json({
        status: "success",
        message: "favourites not found in user",
        error: error.message,
      });
    }
    return res.status(200).json({
      status: "success",
      data: favourites,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "favourites not matched",
      error: error.message,
    });
  }
};

const generateRefresh = async (req, res) => {
  try {
    const user = req.payload;
    const payload = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const newToken = tokenGenerator(payload, false);
    const newTokenRefresh = tokenGenerator(payload, true);
    return res.status(200).json({
      status: "success",
      token: newToken,
      token_refresh: newTokenRefresh,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "refresh not success",
      error: error.message,
    });
  }
};
module.exports = {
  addUser,
  userLogin,
  addToFavourites,
  deleteFavourite,
  getFavouriteFromUser,
  generateRefresh,
  editUser,
};
