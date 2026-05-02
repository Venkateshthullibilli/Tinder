import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setshowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age: Number(age),
          gender: gender.toLowerCase(),
          about,
        },
        { withCredentials: true },
      );
      console.log(res);
      dispatch(addUser(res.data.data));
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 1000);
    } catch (error) {
      // setError(error.message);
      setError(error.response?.data || error.message);
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex items-center justify-center mx-10">
          <div className="card bg-[#26282b54] text-white w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-white">
                    Frist Name
                  </legend>
                  <input
                    type="text"
                    className="input outline-none bg-transparent border-accent"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-white">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    className="input outline-none bg-transparent border-accent"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-white">
                    Photo URL
                  </legend>
                  <input
                    type="text"
                    className="input outline-none bg-transparent border-accent"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-white">Age</legend>
                  <input
                    type="text"
                    className="input outline-none bg-transparent border-accent"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-white">Gender</legend>
                  <input
                    type="text"
                    className="input outline-none bg-transparent border-accent"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-white">About</legend>
                  <textarea
                    className="textarea outline-none bg-transparent border-accent"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center mt-3">
                <button
                  className="btn bg-[#4a52ea] text-[#ffffff]"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span className="text-white">Profile Saved Successfully..</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
