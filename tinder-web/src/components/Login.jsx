import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-40">
      <fieldset className="fieldset relative bg-[#26282b54] rounded-box w-xs border p-10">
        <h2 className="text-center text-2xl text-white">👩‍💻Tinder</h2>
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
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-[#C92C55] underline flex justify-between">
          <p className="cursor-pointer"><Link to="/signup">Sign up</Link></p>
          <p className="cursor-pointer"><Link to="/forgot-password">Forget Password?</Link></p>
        </div>
        {/* <p className="text-[#C92C55] absolute right-10 bottom-5 cursor-pointer">
          <Link to="/forgot-password">Forget Password?</Link>
          </p> */}
      </fieldset>
    </div>
  );
};
export default Login;
