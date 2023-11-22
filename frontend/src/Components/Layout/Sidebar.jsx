import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen">
      <div className="flex h-full w-16 flex-col justify-between border-e-2 border-black bg-white">
        <div>
          <div className="border-t border-gray-100">
            <div className="px-2">
              <ul className="space-y-1 border-t border-gray-100 pt-4">
                <li>
                  {/* dashboard */}
                  <Link
                    to="/Dashboard"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      id="dashboard"
                      width="50px" height="20px"
                    >
                      <path d="M57,12H7a3.00328,3.00328,0,0,0-3,3V49a3.00327,3.00327,0,0,0,3,3H57a3.00327,3.00327,0,0,0,3-3V15A3.00328,3.00328,0,0,0,57,12ZM6,15a1.00127,1.00127,0,0,1,1-1H57a1.00127,1.00127,0,0,1,1,1v3H6ZM58,49a1.00126,1.00126,0,0,1-1,1H7a1.00126,1.00126,0,0,1-1-1V20H58Z"></path>
                      <path d="M55.0098 15H55a1.00491 1.00491 0 1 0 .0098 0zM51 15h-.0098A1.00491 1.00491 0 1 0 51 15zM47.0049 15h-.0098a1.00491 1.00491 0 1 0 .0098 0zM9 24h7a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM9 28h7a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM9 32h7a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM9 36h7a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM39 34h8.8188a.99938.99938 0 0 0 .9834-1.18069 11.95632 11.95632 0 0 0-3.0557-6.0119L46.6255 25H51a1 1 0 0 0 0-2H46a1.00007 1.00007 0 0 0-.8994.56251l-.8999 1.8499a11.916 11.916 0 0 0-5.02-2.2146A.99939.99939 0 0 0 38 24.18121V33A1.0001 1.0001 0 0 0 39 34zm1-8.542A10.06564 10.06564 0 0 1 46.542 32H40zM55 25h.0098A1.00491 1.00491 0 1 0 55 25z"></path>
                      <path d="M55 26H52a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2zM27.5703 42.56251L26.3843 45H22.0098a1 1 0 0 0 0 2h5a1.00005 1.00005 0 0 0 .8994-.56249l1.1844-2.4337a11.97973 11.97973 0 0 0 19.7086-6.8231A.9994.9994 0 0 0 47.8188 36H36V24.18121a.99939.99939 0 0 0-1.1807-.9834 11.985 11.985 0 0 0-7.1864 19.2829A.926.926 0 0 0 27.5703 42.56251zM34 25.45651V37a1.0001 1.0001 0 0 0 1 1H46.5435A10.00237 10.00237 0 1 1 34 25.45651zM18.0098 47a1 1 0 0 0 0-2H18a1 1 0 0 0 .0098 2z"></path>
                      <path d="M18.0098,44h3a1,1,0,0,0,0-2h-3a1,1,0,0,0,0,2Z"></path>
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Dashboard
                    </span>
                  </Link>
                </li>

                <li>
                  {/* product */}
                  <Link
                    to="/ProductList"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="50px" height="20px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <title />

                      <g
                        fill="none"
                        fill-rule="evenodd"
                        id="页面-1"
                        stroke="none"
                        stroke-width="1"
                      >
                        <g
                          id="导航图标"
                          transform="translate(-325.000000, -80.000000)"
                        >
                          <g
                            id="编组"
                            transform="translate(325.000000, 80.000000)"
                          >
                            <polygon
                              fill="#FFFFFF"
                              fill-opacity="0.01"
                              fill-rule="nonzero"
                              id="路径"
                              points="24 0 0 0 0 24 24 24"
                            />

                            <polygon
                              id="路径"
                              points="22 7 12 2 2 7 2 17 12 22 22 17"
                              stroke="#212121"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                            />

                            <line
                              id="路径"
                              stroke="#212121"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              x1="2"
                              x2="12"
                              y1="7"
                              y2="12"
                            />

                            <line
                              id="路径"
                              stroke="#212121"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              x1="12"
                              x2="12"
                              y1="22"
                              y2="12"
                            />

                            <line
                              id="路径"
                              stroke="#212121"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              x1="22"
                              x2="12"
                              y1="7"
                              y2="12"
                            />

                            <line
                              id="路径"
                              stroke="#212121"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              x1="17"
                              x2="7"
                              y1="4.5"
                              y2="9.5"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Products
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/OrderList"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="25px" viewBox="0 0 24 24" fill="none">
<rect x="5" y="4" width="14" height="17" rx="2" stroke="#222222"/>
<path d="M9 9H15" stroke="#222222" stroke-linecap="round"/>
<path d="M9 13H15" stroke="#222222" stroke-linecap="round"/>
<path d="M9 17H13" stroke="#222222" stroke-linecap="round"/>
</svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Orders
                    </span>
                  </Link>
                </li>

                <li>
                 <Link 
                 to="/AccountList"  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                 <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="20px" viewBox="0 0 24 24" fill="none">
<circle cx="12" cy="9" r="3" stroke="#1C274C" stroke-width="1.5"/>
<path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
</svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Account
                    </span>
                    </Link>
                </li>

                <li>
                 <Link 
                 to="/ReviewsProduct"  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                 <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="25px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 14.25C13.3431 14.25 12 15.5931 12 17.25C12 18.9069 13.3431 20.25 15 20.25C16.6569 20.25 18 18.9069 18 17.25C18 15.5931 16.6569 14.25 15 14.25ZM10.5 17.25C10.5 14.7647 12.5147 12.75 15 12.75C17.4853 12.75 19.5 14.7647 19.5 17.25C19.5 19.7353 17.4853 21.75 15 21.75C12.5147 21.75 10.5 19.7353 10.5 17.25Z" fill="#080341"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 8.25H8.25V6.75H15.75V8.25Z" fill="#080341"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.75 11.25H8.25V9.75H15.75V11.25Z" fill="#080341"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 3H16.0607L18.75 5.68934V12H17.25V6.31066L15.4393 4.5H6.75V19.5H9.75V21H5.25V3Z" fill="#080341"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 14.25H8.25V12.75H9.75V14.25Z" fill="#080341"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5791 16.0854L14.9207 15.4146L15.4634 16.5H16.4999V18H14.5364L13.5791 16.0854Z" fill="#080341"/>
</svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Reviews
                    </span>
                    </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
