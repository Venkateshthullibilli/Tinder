import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [otp, SetOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showOtpBtn, setShowOtpBtn] = useState(true);
  const [showVerifyBtn, setShowVerifyBtn] = useState(false);
  const [showCreateBtn, setShowCreateBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleOtp = async () => {
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/forgot-password",
        { emailId },
        { withCredentials: true },
      );
      console.log(res);
      setShowToast(true);
      setShowOtpField(true);
      setShowOtpBtn(false);
      setShowVerifyBtn(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const handleVerifiedOtp = async () => {
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/verify-otp",
        { emailId, otp },
        { withCredentials: true },
      );
      console.log(res);
      setShowVerifyBtn(false);
      setShowCreateBtn(true);
      setShowPassword(true);
      setShowVerified(true);
      setShowOtpField(false);
      setTimeout(() => {
        setShowVerified(false);
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleCreatePassword = async () => {
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/reset-password",
        { emailId, password },
        { withCredentials: true },
      );
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    } catch (error) {
      setError(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-40">
        <fieldset className="fieldset relative bg-[#26282b54] rounded-box w-xs border p-10">
          <h2 className="text-center text-2xl text-white">👩‍💻Tinder</h2>
          <label className="label text-white">Email</label>
          <input
            disabled={showOtpField ? true : false}
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="input bg-transparent border-[#C92C55] outline-none mb-3 text-white"
          />
          {showOtpField && (
            <input
              disabled={showPassword ? true : false}
              type="text"
              value={otp}
              onChange={(e) => SetOtp(e.target.value)}
              placeholder="Please enter OTP here"
              className="input bg-transparent border-[#C92C55] outline-none text-white"
            />
          )}
          {showPassword && (
            <>
              <label className="label text-white">Create New Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input bg-transparent border-[#C92C55] outline-none mb-3 text-white"
              />
            </>
          )}
          <p className="text-red-500">{error}</p>
          {showOtpBtn && (
            <button
              className="btn bg-[#F33B63] mt-4 border-none shadow-none text-white mb-2"
              onClick={handleOtp}
            >
              Send OTP
            </button>
          )}
          {showVerifyBtn && (
            <button
              className="btn bg-[#F33B63] mt-4 border-none shadow-none text-white mb-2"
              onClick={handleVerifiedOtp}
            >
              Verify OTP
            </button>
          )}
          {showCreateBtn && (
            <>
              <button
                className="btn bg-[#F33B63] mt-4 border-none shadow-none text-white mb-2"
                onClick={handleCreatePassword}
              >
                Create Password
              </button>
              <p className="text-[#F33B63] text-[14px] text-end mr-2 underline"><Link to="/login">Login</Link></p>
            </>
          )}
        </fieldset>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-[#F33B63] border-none">
            <span className="text-white">OTP Sent to your email</span>
          </div>
        </div>
      )}
      {showVerified && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-[#F33B63] border-none">
            <span className="text-white">OTP Verified</span>
          </div>
        </div>
      )}
      {showNotification && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-[#F33B63] border-none">
            <span className="text-white">Password updated Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
