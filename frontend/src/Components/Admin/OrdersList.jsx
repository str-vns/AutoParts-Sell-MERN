import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from '../Layout/Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../Utilitys/helpers'
import axios from 'axios'

const OrdersList = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [allOrders, setAllOrders] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)

  

    const listOrders = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.get(`http://localhost:4000/api/v1/admin/orders`, config)
            setAllOrders(data.orders)
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const deleteOrder = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/order/${id}`, config)
            setIsDeleted(data.success)
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)

        }
    }

    useEffect(() => {
        listOrders()
        if (error) {
            console.log(error)
            toast.error(error,
            {
                position: "top-right"
            });
            setError('')
        }
        if (isDeleted) {
            toast.success('Order deleted successfully',
            {
                position: "top-right"
            });
            navigate('/OrderList');
            window.location.reload();
        }
    }, [error, isDeleted])
    const deleteOrderHandler = (id) => {
        deleteOrder(id)
    }

    const confirmOrderHandler = async (id,userData) => {  
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${getToken()}`
                }
            }
          const response = await axios.put(`http://localhost:4000/api/v1/admin/order/confirm/${id}`,userData, config);
          console.log(response); 
          toast.success('Confirmation successfully',
          {
              position: "top-right"
          });
          navigate('/OrderList');
          window.location.reload();
        } catch (error) {
          console.error(error); 
        }
      };

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },

                {
                    label: 'No of Items',
                    field: 'numofItems',
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
                },
            ],
            rows: []
        }

        allOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'blue' }}>{order.orderStatus}</p>,
                actions: 
                <Fragment>
  
 {order.orderConfirmation === 'Confirmed' &&(
    <Fragment>
        <Link
    to={`/OrderProcess/${order._id}`}
    className="btn btn-primary py-1 px-2 ml-2"
  >
    <i className="fa fa-eye"></i>
  </Link>
  <button
    className="btn btn-danger py-1 px-2 ml-2"
    onClick={() => deleteOrderHandler(order._id)}
  >
    <i className="fa fa-trash"></i>
  </button>
    </Fragment>
  )}
 {order.orderConfirmation === 'NotConfirm' &&(
    <Fragment>
    <button
    className="btn btn-success py-1 px-2 ml-2"
    onClick={() => confirmOrderHandler(order._id)}
  >
    <i className="fa fa-check"></i>
  </button>
  <button
    className="btn btn-danger py-1 px-2 ml-2"
    onClick={() => deleteOrderHandler(order._id)}
  >
    <i className="fa fa-trash"></i>
  </button>
  </Fragment>
  
  )}
  
</Fragment>
            })
        })
        return data;
    }
  return (
    <Fragment>
    <MetaData title={"All Accounts"} />
    <div className="flex bg-white">
      <div className="w-full md:w-1/6 h-full">
        <Sidebar />
      </div>

      <div className="w-full md:w-5/6">
        <div className="flex flex-col items-center bg-white">
          <h1 className="my-14 font-bold text-lg text-black mr-32">
          All Accounts
          </h1>
      
          <div className="flex w-full justify-center container pb-10 mr-40">
            <Fragment>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={setOrders()}
                  className="table border-2  border-black shadow-lg py-10 text-black"
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
      </div>
    </div>
  </Fragment>
  )
}

export default OrdersList