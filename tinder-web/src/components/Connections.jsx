import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="flex justify-center my-10 text-white">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl text-white">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          connection;
        return (
          <div className="flex m-4 p-4 border rounded-lg bg-[#26282b54] w-1/2 mx-auto" key={_id}>
            <div>
              <img  
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 text-white">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              {age && gender && <p className="text-[16px] font-bold">{age + ", " + gender}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
