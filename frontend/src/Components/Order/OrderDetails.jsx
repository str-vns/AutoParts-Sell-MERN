import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getToken } from '../../Utilitys/helpers'

const OrderDetails = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [order, setOrder] = useState({})

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    let { id } = useParams();

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

    useEffect(() => {
        getOrderDetails(id)

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }, [error, id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (
                <Fragment>
                    
                  <div className="flex justify-center bg-white py-10">
    <div className="order-details border-2 border-black p-10">
     

                            <h1 className="my-5 text-black">Order # {order._id}</h1>

                            <h4 className="mb-4 border-t-2 text-black border-black ">Shipping Info</h4>
                            <p className='text-black'><b>Name:</b> {user && user.name}</p>
                            <p className='text-black' ><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                            <p className=" text-black"><b>Address:</b>{shippingDetails}</p>
                            <p className='text-black mt-10' ><b>Amount:</b> ${totalPrice}</p>

                           

                            <h4 className="my-4  border-t-2 border-black text-black">Payment</h4>
                            <p className={isPaid ? "text-green-600" : "text-red-600"}><b className='text-black'>{isPaid ? "PAID" : "NOT PAID"}</b></p>


                            <div className="flex items-center my-4">
    <h4 className='text-black'>Order Status:</h4>
    <p className={`ml-2 ${order.orderStatus && String(order.orderStatus).includes('Delivered') ? "text-green-600" : "text-blue-600"}`}>
        <b>{orderStatus}</b>
    </p>
</div>


                            <h4 className="my-4 border-t-2 border-black text-black">Order Items:</h4>

                            <div className="cart-item my-1">
    {orderItems && orderItems.map(item => (
        <div key={item.product} className="flex border-b-2 border-black mb-4 pb-4">
            <div className="w-1/4 ">
                <img src={item.image} alt={item.name} className="w-full " />
            </div>

            <div className=" pl-4 flex flex-col justify-between">
                <Link to={`/products/${item.product}`} className="text-lg font-bold text-black">{item.name}</Link>
                <p className="text-lg font-bold text-black">${item.price}</p>
            </div>

            <div className="w-1/4 pl-4 flex flex-col justify-center items-center">
                <p className="text-lg text-black">{item.quantity} Piece(s)</p>
            </div>
        </div>
    ))}
</div>
                           
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails