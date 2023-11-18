import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../Utilitys/helpers'

const ListOrders = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [myOrdersList, setMyOrdersList] = useState([])

    const myOrders = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const response = await axios.get(`http://localhost:4000/api/v1/orders/my`, config)
            console.log(response)
            setMyOrdersList(response.data.orders)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
        }
    }
    useEffect(() => {
        myOrders();
        if (error) {
            toast.error(error, {
                position: "top-rignt"
            });
        }
    }, [error])

    const setOrders = () => {
        const data = {
          columns: [
            {
              label: 'Order ID',
              field: 'id',
              sort: 'asc'
            },
            {
              label: 'Num of Items',
              field: 'numOfItems',
              sort: 'asc'
            },
            {
              label: 'Amount',
              field: 'amount',
              sort: 'asc'
            },
            {
              label: 'Status',
              field: 'status',
              sort: 'asc'
            },
            {
              label: 'Actions',
              field: 'actions',
              sort: 'asc'
            },
          ],
          rows: []
        };
      
        if (Array.isArray(myOrdersList)) {
  myOrdersList.forEach(order => {
    data.rows.push({
      id: order._id,
      numOfItems: order.orderItems.length ,
      amount: `$${order.totalPrice}`,
      status: order.orderStatus && String(order.orderStatus).includes('Delivered')
        ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
        : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
      actions:
        <Link to={`/OrderDetail/${order._id}`} className="btn  flex h-12 w-1/3 items-center justify-center rounded-lg bg-black px-10 py-3 text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2">
          <p className='text-white hover:text-black '>Open</p>
        </Link>
    });
  });
}

return data;
    };

    return (
        <Fragment>
        <MetaData title={"YOu Orders"} />
  <div className="flex flex-col items-center bg-white">
    <h1 className="my-14 font-bold text-lg text-black">Your Orderlist</h1>
    <div className="flex justify-end">
  </div>
    <div className="flex w-full justify-center container pb-10">
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
  <MDBDataTable
      data={setOrders()}
      className="table border-2 border-black shadow-lg py-10 text-black"
      bordered
      striped
      hover
      entriesOptions={[10, 20, 30]} 
      entries={10} 
      noBottomColumns
      
  
  />
        )}
      </Fragment>
    </div>
  </div>
      </Fragment>
    );
    
}

export default ListOrders