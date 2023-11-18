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
                  <Link
                    to="/Dashboard"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      id="dashboard"
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
                  <Link
                    to="/ProductList"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
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
                    to=""
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Invoices
                    </span>
                  </Link>
                </li>

                <li>
                  <a
                    href=""
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Account
                    </span>
                  </a>
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
