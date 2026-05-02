import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, age, gender },
        { withCredentials: true },
      );
      console.log(res);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      dispatch(addUser(res.data.data));
      setError("");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-20">
        <fieldset className="fieldset relative bg-[#26282b54] rounded-box w-xs border p-10">
          <h2 className="text-center text-2xl text-white">👩‍💻Tinder</h2>
          <label className="label text-white">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input bg-transparent border-[#C92C55] outline-none mb-2 text-white"
          />

          <label className="label text-white">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input bg-transparent border-[#C92C55] outline-none mb-2 text-white"
          />

          <label className="label text-white">Age</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input bg-transparent border-[#C92C55] outline-none mb-2 text-white"
          />

          <label className="label text-white">Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input bg-transparent border-[#C92C55] outline-none mb-2 text-white"
          />

          <label className="label text-white">Email</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="input bg-transparent border-[#C92C55] outline-none mb-2 text-white"
          />

          <div className="relative">
            <label className="label text-white mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input bg-transparent border-[#C92C55] outline-none mb-2 text-white"
            />
            <img
              className="absolute right-4 bottom-4 cursor-pointer"
              src={
                showPassword
                  ? "https://res.cloudinary.com/dfxytykhs/image/upload/v1723536269/eye-slash_rheirr.png"
                  : "https://res.cloudinary.com/dfxytykhs/image/upload/v1720197961/eye_t6aaxr.png"
              }
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <button
            className="btn bg-[#F33B63] mt-4 border-none shadow-none text-white mb-2"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <div className="text-[#C92C55] underline flex justify-between">
            <p className="cursor-pointer">
              <Link to="/login">Sign in</Link>
            </p>
            <p className="cursor-pointer">
              <Link to="/forgot-password">Forget Password?</Link>
            </p>
          </div>
        </fieldset>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-[#F33B63] border-none">
            <span className="text-white">User added Successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
