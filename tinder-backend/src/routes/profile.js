const express = require("express")
const { userAuth } = require("../middlewares/auth")
const {validateEditProfileData} = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // console.log(user)
    res.send(user)
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //validataProfileEditData
    if (!validateEditProfileData(req)){
        throw new Error ("Invalid Edit Request")
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key]= req.body[key]))
    await loggedInUser.save()
    res.json({
  message: `${loggedInUser.firstName}, your profile updated successfully!`,
  data: loggedInUser,
});

  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = profileRouter;
