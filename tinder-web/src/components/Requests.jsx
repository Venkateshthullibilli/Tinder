import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showButtons, setShowButtons ] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id))
    } catch (error) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center my-10 text-white">No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl text-white">Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          request.fromUserId;
        return (
          <div
            className="flex justify-between items-center m-4 p-4 border rounded-lg bg-[#26282b54] w-1/2 mx-auto"
            key={_id}
          >
            <div>
              <img
                alt="photo"
                className="rounded-2xl object-contain"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 text-white">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              {age && gender && <p>{age + ", " + gender}</p>}
            </div>
            <div>
              <button
                className="btn btn-active btn-error text-white my-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-active btn-success text-white my-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
