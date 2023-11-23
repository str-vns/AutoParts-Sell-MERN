import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = user || {};

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      console.log(error);
      setError();
    }
  }, [error, isAuthenticated]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e) => {
    if (!name || !email || !password) {
      toast.error("Name, email, and password are required");
      return;
    }

    if (!avatar) {
      toast.error("image are required");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Password does not match");
      toast.error("Password does not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.set("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    if (avatar) formData.append("avatar", avatar);

    register(formData);
  };

  console.log("Password:", password);
  console.log("Password Confirmation:", passwordConfirm);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);

      setAvatar(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const register = async (userData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `http://localhost:4000/api/v1/register`,
        userData,
        config
      );
      console.log(data.user);
      setIsAuthenticated(true);
      setLoading(false);
      setUser(data.user);
      toast.success("Registration successful");
      navigate("/");
      window.location.reload()
    } catch (error) {
      setError(error.message || "An error occurred during registration");
      toast.error("Registration failed");
      setIsAuthenticated(false);
      console.log(error.response.data);
      setLoading(false);
      setUser(null);
      setError(error);
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must have at 8 characters"),
    passwordConfirm: Yup.string()
      .required("Please re-type your password")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
      images: Yup.string().required("Image is required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      images: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitting Register with values:", values);

      try {
        submitHandler(values);
        toast.success("Register Success");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },
  });

  return (
    <Fragment>
      <MetaData title={"Register User"} />
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="/">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Squid 🦑
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Squid 🦑
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p>
              </div>

              <form
                className="mt-8 grid grid-cols-6 gap-6"
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                <h1 className="text-3xl font-bold text-black col-span-6">
                  Register
                </h1>

                <div className="form-group col-span-6">
                  <label
                    htmlFor="name_field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                    {formik.errors.name && formik.touched.name && (
                      <span className="text-red-500 text-sm ml-3">
                        {formik.errors.name}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    className="mt-1 p-4 lg:w-full md:w-full sm:w-full rounded-md border-2 h-10 border-black bg-white text-sm text-gray-700 shadow-sm"
                    name="name"
                    value={formik.values.name}
                    onChange={(event) => {
                      onChange(event);
                      formik.setFieldValue("name", event.target.value);
                    }}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="email_field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                    {formik.errors.email && formik.touched.email && (
                      <span className="text-red-500 text-sm ml-3">
                        {formik.errors.email}
                      </span>
                    )}
                  </label>
                  <input
                    type="email"
                    id="email_field"
                    className="mt-1 p-4 lg:w-full md:w-full sm:w-full rounded-md border-2 h-10 border-black bg-white text-sm text-gray-700 shadow-sm"
                    name="email"
                    value={formik.values.email}
                    onChange={(event) => {
                      onChange(event);
                      formik.setFieldValue("email", event.target.value);
                    }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="form-group">
                    <label
                      htmlFor="password_field"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password 
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password_field"
                        className="mt-1 p-4 lg:w-full md:w-full sm:w-full rounded-md border-2 h-10 border-black bg-white text-sm text-gray-700 shadow-sm"
                        name="password"
                        value={formik.values.password}
                        onChange={(event) => {
                          onChange(event);
                          formik.setFieldValue("password", event.target.value);
                        }}
                        />
                     

                      <span
                        onClick={toggleShowPassword}
                        className="absolute right-4 bottom-1 transform -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 text-black `}
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
                            className={`h-4 w-4 text-teal-600 `}
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
                  {formik.errors.password && formik.touched.password && (
                      <span className="text-red-500 text-sm ml-3">
                        {formik.errors.password}
                      </span>
                    )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation  
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="passwordConfirm"
                      name="passwordConfirm"
                      className="mt-1 p-4 lg:w-full md:w-full sm:w-full rounded-md border-2 h-10 border-black bg-white text-sm text-gray-700 shadow-sm"
                      value={formik.values.passwordConfirm}
                      onChange={(event) => {
                        onChange(event);
                        formik.setFieldValue("passwordConfirm", event.target.value);
                      }}
                      />

                    <span
                      onClick={toggleShowPassword}
                      className="absolute right-4 bottom-1 transform -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 text-black `}
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
                          className={`h-4 w-4 text-teal-600 `}
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
                  {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                      <span className="text-red-500 text-sm ml-3">
                        {formik.errors.passwordConfirm}
                      </span>
                    )}
                </div>

                <div className="col-span-6 form-group">
                  <label
                    htmlFor="avatar_upload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Avatar
                  </label>
                  <div className="d-flex flex-wrap items-centermy-2">
                    <div className="pr-3">
                      <figure className="avatar w-20 h-20">
                        <img
                          src={avatarPreview}
                          className="rounded-circle w-16 h-16  object-cover "
                          alt="Avatar Preview"
                        />
                      </figure>
                    </div>
                    <div className="custom-file relative">
                      <input
                        type="file"
                        name="avatar"
                        className="hidden "
                        id="customFile"
                        accept="image/*"
                        onChange={(event) => {
                          onChange(event);
                          formik.setFieldValue(
                            "images",
                            event.currentTarget.files
                          );
                          formik.setFieldTouched("images", true, false);
                        }}
                      />
                      <label
                        htmlFor="customFile"
                        className="px-4 py-2 border-2 border-black rounded-md cursor-pointer bg-white text-black hover:bg-black hover:text-white"
                      >
                        Choose Avatar
                      </label>
                      {formik.errors.images && formik.touched.images && (
                      <span className="text-red-500 text-sm ml-3">
                        {formik.errors.images}
                      </span>
                    )}
                    </div>
                  </div>
                </div>

                <button
                  id="register_button"
                  type="submit"
                  className="inline-block rounded-lg bg-black px-5 py-3 w-[150px] text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2"
                  // disabled={loading ? false : true}
                >
                  REGISTER
                </button>
              </form>
            </div>
          </main>
        </div>
      </section>
    </Fragment>
  );
};

export default Register;
