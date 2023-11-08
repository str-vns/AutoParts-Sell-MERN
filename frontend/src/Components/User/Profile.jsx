import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../Utilitys/helpers";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/profile`,
        config
      );
      console.log(data);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />

<div className="justify-center flex p-10  bg-white">
<a href="#"
  className="relative block overflow-hidden rounded-lg border border-black p-4 sm:p-6 lg:p-8 "
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span>

  <div className="sm:flex sm:justify-between sm:gap-4  ">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl ">
        MY Profile
      </h3>

      <h1 className="mt-1  font-medium text-black">{user.name}</h1>
    </div>

    <div className="hidden sm:block sm:shrink-0 pl-60 ">
      <img
       src={user.avatar.url}
       alt={user.name}
        className="h-16 w-16 rounded-lg object-cover shadow-sm"
      /> 
       <Link
                to="/proflie/update"
                id="edit_profile"
                
              >
                <div className="pl-12">
              <svg className="feather feather-edit pr-2 text-blue-600" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              </Link>
    </div>
  </div>

  <div className="mt-4">
    <p className="max-w-[40ch] text-sm text-gray-500">
      Email: {user.email}
    </p>
    <p className="max-w-[40ch] text-sm pt-2 text-gray-500">
      Joined On: {String(user.createdAt).substring(0, 10)}
    </p>
  </div>

  <dl className="mt-6 flex gap-4 sm:gap-6">
    <div className="flex flex-col-reverse">
    {user.role !== "admin" && (
                <Link to="/orders/me" className="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2">
                  My Orders
                </Link>
              )}
    </div>

    <div className="flex flex-col-reverse">
    <Link
                to="/password/update"
                className="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2"
              >
                Change Password
              </Link>
    </div>
  </dl>
</a>
          </div>
    
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
