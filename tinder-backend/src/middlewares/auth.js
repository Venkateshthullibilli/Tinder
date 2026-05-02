const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
     return res.status(401).send("Please Login!!");
    }
    // verifying the token using secret key
    const decodedObj = await jwt.verify(token, "VenkyDEV@123");
    // Find the user from decodedObj, This _id was stored when the token was created during login.
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    // You are adding a new property called user to the request object.
    req.user = user;
    // Passes control to the next middleware or API route
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};




module.exports = { userAuth };
