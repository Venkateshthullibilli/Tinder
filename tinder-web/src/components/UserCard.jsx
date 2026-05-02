import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, age, lastName, photoUrl, gender, about } = user || {};
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId, 
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error.response);
    }
  };


  return ( 
    <div className="mb-10">
      <div className="card bg-[#26282b54] w-96 shadow-sm">
        <figure className="h-96 w-full">
          <img src={photoUrl} alt="Profile" className="w-full h-full object-cover"/>
        </figure>
        <div className="card-body text-white">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",_id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;


