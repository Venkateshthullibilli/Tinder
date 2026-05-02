import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(user)
    const handleLogout = async () => {
      try {
        const res = axios.post(BASE_URL + "/logout",{},{withCredentials:true})
        dispatch(removeUser());
        navigate("/login")
      } catch (error) {
        console.error(error)
      }
    }
  return (
    <div>
      <div className="navbar bg-[#5c5c5c6e] shadow-blue-200">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-xl text-white">👩‍💻 DevTinder</Link>
        </div>
        {user && (<div className="flex gap-2">
         <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to = "/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default Navbar;
