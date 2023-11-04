import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser, logout } from '../../Utilitys/helpers';
import axios from 'axios'; // Import Axios
import { GoogleLogout } from 'react-google-login';

const clientId = "965475144008-u9mfeqg7399ld09i40faoutoe9l4eibs.apps.googleusercontent.com";

const Header = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await axios.get(`http://localhost:4000/api/v1/logout`);
      setUser({}); // Set user to an empty object after logout
      logout(() => navigate('/'));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const onSuccess = async (res) => {
    
    toast.success(`Logout Success: currentUser: ${JSON.stringify(res.profileObj)}`, {
      position: 'top-right',
    });
  }

  const logoutHandler = () => {
    logoutUser();
    toast.success('Logged out Successfully', {
      position: 'top-right',
    });
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <header className="bg-white border-2 border-b-black">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-block text-teal-600">
            <div className="flex items-center">
              <img
                src="./images/garage_10725666.png"
                className="h-10 w-10"
                alt="OnGarage Logo"
              />
              <h3 className="ml-2 text-2xl">OnGarage</h3>
            </div>
          </Link>
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link to="/" className="text-gray-500 transition hover:text-gray-500/75">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-500 transition hover:text-gray-500/75">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-500 transition hover:text-gray-500/75">
                    History
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-500 transition hover:text-gray-500/75">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-500 transition hover:text-gray-500/75">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-500 transition hover:text-gray-500/75">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link to="/">
                  <Search />
                </Link>
                {user.name ? (
                  <div className="relative">
                    <div
                      className="inline-flex items-center overflow-hidden rounded-md bg-white"
                      tabIndex="0"
                    >
                      <div className="inline-flex px-5 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                        <img
                          alt={user.name}
                          src={user.avatar && user.avatar.url}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <p className="ms-2 hidden text-left text-xs sm:block">
                          <strong className="block font-medium text-black">
                            {user.name}
                          </strong>
                          <span className="text-gray-500"> {user.email} </span>
                        </p>
                      </div>
                      <button
                        onClick={toggleDropdown}
                        className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 "
                        tabIndex="-1"
                      >
                        <span className="sr-only">Menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className={`h-4 w-4 ${isOpen ? 'group-open:-rotate-180' : ''}`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                    </div>
                    {isOpen && (
                      <div
                        className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                        role="menu"
                      >
                        <div className="p-2" onClick={closeDropdown}>
                          <Link
                            className="block rounded-lg px-4 py-2 text-sm text-black hover:bg-gray-50 hover:text-gray-700"
                            to="/orders/me"
                          >
                            Orders
                          </Link>
                          <Link
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            to="/me"
                          >
                            Profile
                          </Link>
                          <Link
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            to="/"
                            onClick={logoutHandler}
                          >
                            <img src="./images/icons8-logout-64.png" className="w-6" />
                         
                            Logout
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" id="login_btn">
                    <a className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">
                      Login
                    </a>
                  </Link>
                )}
              </div>
            </div>
            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
