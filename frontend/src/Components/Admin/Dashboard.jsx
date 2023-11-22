import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";
import DProductSale from "./DProductSale";
import DShippingcommon from "./DShippingcommon";
import DProductsRevenue from "./DProductsRevenue";
import { Link } from "react-router-dom";
import DMonthlySale from "./DMonthlySale";
import { getToken } from '../../Utilitys/helpers'
import axios from 'axios'

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState([]);
  const [totalUser, setTotalUser] = useState([]);
  const [totalStock, setTotalStock] = useState([]);


  const getTotalAmount = async () => {

  
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await axios.get(`http://localhost:4000/api/v1/admin/totalsales`, config)
  
      console.log('API request successful', response.data.totalSale); 
      setTotalAmount(response.data.totalSale);
    } catch (error) {
      console.log('API request failed', error); 
  
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  }

  const getUserCount = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await axios.get(`http://localhost:4000/api/v1/admin/numusers`, config)
      console.log('API request successful', response.data.numofUser); 
      setTotalUser(response.data.numofUser);
      console.log(response.data.numofUser)

    } catch (error) {
      console.log('API request failed', error); 
  
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  }

  const getStockCount = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };
      const response = await axios.get(`http://localhost:4000/api/v1/admin/productStocky`, config)
      console.log('API request successful', response.data.ItemStock); 
      setTotalStock(response.data.ItemStock);
      console.log(response.data.ItemStock)

    } catch (error) {
      console.log('API request failed', error); 
  
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  }
  useEffect(() => {
    getTotalAmount()
    getUserCount()
    getStockCount()
  }, []);

  return (
    <Fragment>
    <div className="flex bg-white">
      <div className="w-full md:w-1/6">
        <Sidebar />
      </div>
  
      <div className="w-full md:w-5/6 mr-60">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Dashboard
            </h2>
          </div>
  
          <Fragment>
            <MetaData title={"Admin Dashboard"} />
  
            <div className="mt-8 sm:mt-12 mb-12">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="group">
                <div className="flex flex-col rounded-lg bg-white border-2 border-black px-4 py-8 text-center group-hover:bg-black">
       
                  <dt className="order-last text-lg font-medium text-black  group-hover:text-white">
                    Total Sales
                  </dt>
  
                  <dd className="text-sm font-extrabold text-black md:text-4xl group-hover:text-white">
  $ {totalAmount}
</dd>
</div>
                </div>
                <div className="group">
                <div className="flex flex-col rounded-lg bg-white border-2 border-black px-4 py-8 text-center group-hover:bg-black">
      
          <dt className="order-last text-lg font-medium text-black group-hover:text-white">
            Total User
          </dt>
          <dd className="text-sm font-extrabold text-black md:text-4xl group-hover:text-white">{totalUser}</dd>
        </div>
      </div>
      <div className="group">
                <div className="flex flex-col rounded-lg bg-white border-2 border-black px-4 py-8 text-center group-hover:bg-black">
          
                  <dt className="order-last text-lg font-medium text-black group-hover:text-white">
                    Total NaN Stock
                  </dt>
  
                  <dd className="text-sm font-extrabold text-black md:text-4xl group-hover:text-white">{totalStock}</dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h6 className=" ml-24 text-black">Monthly Sales</h6>
              <div className="w-full h-64 mb-32 ml-36">
                <DMonthlySale />
              </div>
  
              <div className="grid grid-cols-3 gap-3 w-full">
             
                <div className="h-64">
                <h6 className=" ml-32 text-black">Product Sales</h6>
                  <DProductSale />
                </div>
                <div className="h-64">
                <h6 className=" ml-48 text-black">Most Shipped</h6>
                  <DShippingcommon/>
                </div>
                <div className="h-64">
                <h6 className=" ml-44 text-black">Product Revenue</h6>
                  <DProductsRevenue/>
                </div>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
