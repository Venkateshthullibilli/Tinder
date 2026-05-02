const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors")
require("dotenv").config();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",userRouter)
app.use("/",requestRouter);
 
connectDB()
  .then(() => {
    console.log("Database Connection Established...");
    app.listen(3000, () => {
      console.log("Server is Successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database can not be connected!");
  });
