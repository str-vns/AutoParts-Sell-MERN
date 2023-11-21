import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../Layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../Utilitys/helpers';

const Payment = ({cartProducts, ShippingCope}) => {
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate();

    const [shippingCopeId, setShippingCopeId] = useState(localStorage.getItem('ShippingCopeId') || "");

   

      
console.log(shippingCopeId)
    useEffect(() => {
        // Store ShippingCope.id in local storage and update shippingCopeId state whenever ShippingCope changes
        if (ShippingCope && ShippingCope.id) {
            localStorage.setItem('ShippingCopeId', ShippingCope.id);
            setShippingCopeId(ShippingCope.id);
        }
    }, [ShippingCope]);

    const order = {
        orderItems: cartProducts,
        ShippingCope: shippingCopeId
    }



    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const createOrder = async (order) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.post(`http://localhost:4000/api/v1/order/new`, order, config)
            setLoading(false)
            toast.success('order created', {
                position: "top-right"
            });

            sessionStorage.removeItem('orderInfo');
            localStorage.removeItem('cartProducts');
            localStorage.removeItem('ShippingCope');
            navigate('/')
            window.location.reload();
        } catch (error) {
            const message = error.response ? error.response.data.message : 'An error occurred. Please try again.';
            toast.error(message, {
                position: "top-right"
            });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        order.paymentInfo = {
            id: 'ew_ds32sssew231444',
            status: 'succeeded'
        }
        createOrder(order)
       
      }

    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <input
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <input
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                               
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <input
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                
                            />
                        </div>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment