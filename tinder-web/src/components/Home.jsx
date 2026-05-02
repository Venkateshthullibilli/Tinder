import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-full">
      <img
        src="https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp"
        alt="bg"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-white font-extrabold text-[6vw] leading-none text-center">
          Start something epic.
        </h1>
        <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-full text-xl" onClick={() => navigate("/signup")}>
          Create account
        </button>
        <p className="text-white my-5 text-base">if you have already an account? <span className="text-pink-400 underline" ><Link to="/login">Sign in</Link></span></p>
      </div>
    </div>
  );
};

export default Home;
