const express = require("express");
const app = express();
const User = require("../models/user");
const cookieParser = require("cookie-parser");
const OTP = require("../models/otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const validator = require("validator");
const { validateSignUpData } = require("../utils/validation");
app.use(cookieParser());
app.use(express.json());

const authRouter = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    console.log(firstName);
    // Validation of data
    validateSignUpData(req);

    // If the user exists or not
    const isExistedUSer = await User.findOne({ emailId });
    if (isExistedUSer) {
      throw new Error("User already exists");
    }
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
    });
    const savedUSer =  await user.save();
  
    const token = await savedUSer.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000)
    });

    res.status(200).json({message: "User added Successfully", data: savedUSer});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();
      // console.log(token)
      //Add the token to cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


authRouter.post("/forgot-password", async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    await OTP.deleteMany({ emailId });
    await OTP.create({
      emailId,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: emailId,
      subject: "gmail",
      text: "Reset Your Password",
      html: `<b>Here is your OTP: ${otp}</b>`,
    });
    res
      .status(200)
      .json({ success: true, message: "OTP has been sent to your email!" });
  } catch (err) {
    console.log(err)
    res.status(400).send(err.message);
  }
});


authRouter.post("/verify-otp", async (req, res) => {
  try {
    const { emailId, otp } = req.body;
    const otpDoc = await OTP.findOne({ emailId });
    if (!otpDoc) {
       return res.status(400).json({ success: false, message: "OTP not found" });
    }

    if (otpDoc.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({ success: false, message: "invalid OTP" });
    }

    res.status(200).json({ success: true, message: "OTP Verified!" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});


authRouter.post("/reset-password", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    
    const user = await OTP.findOne({ emailId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (!validator.isStrongPassword(password)){
            return res.status(400).json({success: false, message: "Please enter a strong password"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ emailId}, {password: hashedPassword });
    await OTP.deleteOne({emailId});
    return res
      .status(200)
      .json({ success: true, message: "Password Updated Successfully!" });
  } catch (error) {
    res.status(400).send(error.message)
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successful!");
});

module.exports = authRouter;
