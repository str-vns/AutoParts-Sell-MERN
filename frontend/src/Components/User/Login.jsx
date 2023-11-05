import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../Layout/Loader";
import Metadata from "../Layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authenticate } from "../../Utilitys/helpers";
import { getUser } from "../../Utilitys/helpers";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
  };

  const [user, setUser] = useState(initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "";

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://localhost:4000/api/v1/login`,
        { email, password },
        config
      );
      console.log(data);
      authenticate(data, () => {
        toast.success("Logged in successfully", {
          position: "top-right",
        });
        navigate("/");
      });
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
      toast.error("User or Password is Invalid", {
        position: "top-right",
      });
     
    }
  };

  const responseFacebook = async (response) => {
    try {
      console.log(response)
        
      const {accessToken, userID} = response
      const { data } = await axios.post('http://localhost:4000/api/v1/facebook_login', {accessToken, userID})
  
      if (data && data.user) {
        console.log("Received from server:", data.user);
  
        sessionStorage.setItem("user", JSON.stringify(data.user));
  
        // Retrieve the user data from session storage
        const userJson = sessionStorage.getItem("user");
        
        if (userJson) {
          const user = JSON.parse(userJson);
          console.log("Stored in session storage:", user);
        
          authenticate(data, () => {
            toast.success("Logged in successfully", {
              position: "top-right",
            });
            navigate("/");
            console.log("Retrieved from session storage:", user);
            console.log(user.name, user.email, user.avatar);
          });
        } else {
          console.error("No user data in session storage");
        }
      } else {
        console.error("No user data in server response");
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        console.error("Response Data:", err.response.data);
      }
      toast.error("Facebook Login Failed", {
        position: "top-right",
      });
    }
  }
  
  const responseGoogle = async (response) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/google_login",
        {
          tokenId: response.tokenId,
        }
      );
      console.log("Received from server:", data.user);

      // Store the user data in session storage
      sessionStorage.setItem("user", JSON.stringify(data.user));
      console.log(
        "Stored in session storage:",
        JSON.parse(sessionStorage.getItem("user"))
      );

      authenticate(data, () => {
        toast.success("Logged in successfully", {
          position: "top-right",
        });
        navigate("/");
        const user = JSON.parse(sessionStorage.getItem("user"));
        console.log("Retrieved from session storage:", user);
        console.log(user.name, user.email, user.avatar);
      });
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        console.error("Response Data:", err.response.data);
      }
      toast.error("Google Login Failed", {
        position: "top-right",
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    login(email, password);
  };

  useEffect(() => {
    if (getUser() && redirect === "shipping") {
      navigate(`/${redirect}`);
    }
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Login"} />

          <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-white">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
              <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl text-black">
                  Welcome To OnGarage! Please Login{" "}
                </h1>
              </div>
              <form
                className="mx-auto mb-0 mt-8 max-w-md space-y-4"
                onSubmit={submitHandler}
              >
                <div>
                  <label htmlFor="email_field" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      id="email_field"
                      className="w-full rounded-lg border-2 border-black bg-white p-4 pe-12 text-sm shadow-sm text-black"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4 bf">
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
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="password_field" className="sr-only">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password_field"
                      className="w-full rounded-lg border-2 border-black p-4 pe-12 bg-white text-sm shadow-sm text-black"
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <label
                      className="absolute inset-y-0 end-0 grid place-content-center px-4"
                      htmlFor="check"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-black ${
                          showPassword ? "text-teal-600" : ""
                        }`}
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
                    </label>
                    <input
                      id="check"
                      type="checkbox"
                      value={showPassword}
                      onChange={() => setShowPassword((prev) => !prev)}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="grid grid-rows-2 ">
                    <p className="text-sm text-black">
                      No account?
                      <Link to="/register">
                        <a className=" hover:underline"> Sign up</a>
                      </Link>
                    </p>
                    <p className="text-sm text-black py-1 ">
                      You Forgot Password?
                      <Link to="/password/forgot" className=" hover:underline">
                        {" "}
                        Forgot Password
                      </Link>
                    </p>
                  </div>

                  <button
                    id="login_button"
                    type="submit"
                    className="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div className="text-center text-sm text-black pt-5">
              <p> Other Ways to login!</p>
              <div className="social mt-2 flex grid-cols-6 gap-3 justify-center item-center">
                
                <div className="col-span-2 ">               
                 <GoogleLogin
                  clientId="1050826465955-mpgi9kopddpq75bacchdjkaeahbqr58e.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                 icon="fa-google pr-2"
                 render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="h-12 px-2 flex items-center space-x-2 border border-transparent bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow-xl cursor-pointer"
                  >
                    <img src="./images/icons8-google-48.png" className="p-2 h-10 w-10" alt="Google Icon" />
                    <span>Login with Google</span>
                  </button>
                )}
                  
                />
                </div>

                <div className="col-span-2 sm:col-span-3 ">
                
                <FacebookLogin
                  appId="888477926021245"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="h-12 px-5  bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-xl cursor-pointer "
                  icon="fa-facebook pr-2"
                />
                 </div>
              </div>
            </div>
           </div>
            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
              <img
                alt="Welcome"
                src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
