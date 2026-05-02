import React from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getFeed();
  }, []);

  console.log(feed)

  if (!feed) return;

  if(feed.length <= 0) return <h1 className="flex justify-center text-bold my-5 text-white">No new users found</h1>

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
  )
)
};

export default Feed;
