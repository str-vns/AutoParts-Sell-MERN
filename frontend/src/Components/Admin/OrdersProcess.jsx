import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams, useNavigate,  } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from '../Layout/Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { getToken } from '../../Utilitys/helpers'

const OrdersProcess = () => {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [order, setOrder] = useState({})
  const [isUpdated, setIsUpdated] = useState(false)
  let navigate = useNavigate()

  let { id } = useParams();
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
  const orderId = id;
  const errMsg = (message = '') => toast.error(message, {
      position:"top-right"
  });

  const successMsg = (message = '') => toast.success(message, {
      position:"top-right"
  });

  const getOrderDetails = async (id) => {
      try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${getToken()}`
              }
          }

          const { data } = await axios.get(`http://localhost:4000/api/v1/order/${id}`, config)
          setOrder(data.order)
          setLoading(false)
      } catch (error) {
          setError(error.response.data.message)
      }
  }
  const updateOrder = async (id, formData) => {
    
      try {
          const config = {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${getToken()}`
              }
          }
          const { data } = await axios.put(`http://localhost:4000/api/v1/admin/order/${id}`, formData, config)
          setIsUpdated(data.success)
          

      } catch (error) {
          setError(error.response.data.message)
      }
  }

  useEffect(() => {
      getOrderDetails(orderId)
      if (error) {
          errMsg(error);
          setError('')
      }
      if (isUpdated) {
          successMsg('Order updated successfully');
          setIsUpdated('')
          navigate('/OrderList')
      }
  }, [error, isUpdated, orderId])

  const updateOrderHandler = (id) => {
      const formData = new FormData();
      formData.set('status', status);
      updateOrder(id, formData)
  }

  const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
  const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
  return (
    <Fragment>
    <MetaData title={`Process Order # ${order && order._id}`} />
    <div className="flex bg-white">
      <div className="w-full md:w-1/6 h-full">
        <Sidebar />
      </div>

      <div className="w-full md:w-5/6">
        <div className="flex flex-col items-center bg-white">
            <Fragment>
                {loading ? <Loader /> : (
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-7 order-details">
                            <h1 className="my-14 font-bold text-lg text-black mr-32">Edit Order # {order._id}</h1>
                            <h4 className="mb-4 border-t-2 text-black border-black">Shipping Info</h4>
                            <p className='text-black'><b>Name:</b> {user && user.name}</p>
                            <p className='text-black'><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className='text-black'><b>Address:</b>{shippingDetails}</p>
                            <p className='text-black mt-10 border-b-2 border-black' ><b>Amount:</b> ${totalPrice}</p>

                            <h4 className="my-4 text-black">Payment: <span className={isPaid ? "text-green-600" : "text-red-600"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></span> </h4>
                            
                            <h4 className="my-4 text-black">Stripe ID: <span className='text-black' ><b>{paymentInfo && paymentInfo.id}</b></span></h4>

                            <h4 className="my-4 border-b-2 border-black text-black">Order Status: <span className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "text-green-600" : "text-blue-600"} ><b>{orderStatus}</b></span></h4>
                  
                            <h4 className="my-4 text-black">Order Items:</h4>
                         
                            <div className="cart-item my-1 border-b-2 border-black">
                                {orderItems && orderItems.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5 text-black">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0 text-black">
                                            <p>${item.price}</p>
                                        </div>
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0 text-black">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                           
                        </div>
                        <div className="flex items-center space-x-4">
  <h4 className="my-4 text-black">Status: </h4>
  <div className="form-group">
    <select
      className="form-control"
      name='status'
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="Processing">Processing</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>

                            
                        </div>
                        <button className="btn inline-block my-2 rounded-lg bg-black  py-3 w-[150px] text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2" onClick={() => updateOrderHandler(order._id)}>
                                Update Status
                            </button>
                    </div>
                )}
            </Fragment>
        </div>
    </div>
    </div>
</Fragment>
  )
}

export default OrdersProcess