import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { token } = useParams();

  const resetPassword = async (token, passwords) => {
    try {
      token = token.trim();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `http://localhost:4000/api/v1/password/reset/${token}`,
        passwords,
        config
      );

      setSuccess(data.success);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
    if (success) {
      toast.success("Password updated", {
        position: 'top-center',
      });
      navigate("/login");
    }
  }, [error, success, navigate]);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      const formData = {
        password,
        confirmPassword,
      };
      resetPassword(token, formData);
    }
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />
      <div className="px-4 py-40 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-black">New Password</h1>
        </div>

        <form onSubmit={submitHandler} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="password_field" className="text-mg text-black pl-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password_field"
                className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={toggleShowPassword}>
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4  text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirm_password_field" className="text-mg text-black pl-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirm_password_field"
                className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={toggleShowPassword}>
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:border-2 hover:border-black hover:bg-white hover:text-black"
          >
            Set Password
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewPassword;
