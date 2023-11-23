import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { getUser } from '../../Utilitys/helpers'
import axios from 'axios'
function ConfirmOrder({cartProducts, ShippingCope}) {
    const [user, setUser] = useState(getUser() ? getUser() : {})
    const [locations, setLocations] = useState([]);
    let navigate = useNavigate();
    const [shippingCopeId, setShippingCopeId] = useState(localStorage.getItem('ShippingCopeId') || "");
    const itemsPrice = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }

    const cityLocation = async () => {
        try {
          
    
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/oneshipping/${shippingCopeId}`
          );
          console.log('Response data:', data);

          setLocations(data.shipping);
          console.log('Locations:', locations);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        cityLocation();

        if (ShippingCope.id) {
          localStorage.setItem('ShippingCopeId', ShippingCope.id);
          setShippingCopeId(ShippingCope.id);
        }
      }, [ ShippingCope.id]);

    
        return (
          <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps confirmOrder />
            <div className="w-full ">
              <div className="flex flex-col items-center bg-white">
                <div className="w-screen max-w-lg space-y-4">
                  <div className="col-12 col-lg-7 order-details">
                    <h4 className="mb-4 border-t-2 text-black">Shipping Info</h4>
                    {user && <p className='text-black'><b>Name:</b> {user.name}</p>}
                    <p className='text-black'><b>Phone:</b> {locations.phoneNo}</p>
                    <p className='text-black'><b>Address:</b> {`${locations.address}, ${locations.city}, ${locations.postalCode}, ${locations.country}`}</p>
      
                    <h4 className="my-4 text-black">Order Items:</h4>
      
                    <div className="cart-item my-1 border-b-2 border-black">
                      {cartProducts.map(item => (
                        <Fragment key={item.product}>
                          <div key={item.product} className="row my-5">
                          <div className="mt-8 ">
              <ul className="space-y-4">
                <li className="flex items-center justify-between gap-4">
                  <img src={item.image} className="h-16 w-16 rounded object-cover" />

                  <div>
                    <div className="text-sm text-gray-900">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <p id="card_item_price">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <div className="stockCounter flex items-center gap-2">
                    <p className='text-black text-sm'>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
                            
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className=" flex justify-end border-t border-gray-100 pt-8">
          <div className="w-screen max-w-lg space-y-4 ">
                 <dl className="space-y-0.5 text-sm text-gray-700  ">
            <div id="order_summary">
              <h4>Order Summary</h4>
             
              
              <div className='flex justify-between !text-base font-medium'>
              <dt>Subtotal:</dt>
              <dd>${itemsPrice.toFixed(2)}</dd>
              </div>
           
              <div className='flex justify-between !text-base font-medium'>
              <dt>Shipping:</dt>
              <dd>${shippingPrice}</dd>
              </div>

              <div className='flex justify-between !text-base font-medium'>
              <dt>Tax:</dt>
              <dd>${taxPrice}</dd>
              </div>

              <div className='flex justify-between !text-base font-medium'>
              <dt>Total:</dt>
              <dd>${totalPrice}</dd>
              </div>

              </div>
 </dl>
            
              <div className="flex justify-end border-t-2 border-black pt-10">
                <button className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600" onClick={processToPayment}>
                  Update Status
                </button>
                </div>
          </div>
          </div>a
         
              </div>
            </div>
          </Fragment>
        );
      };
      
 

export default ConfirmOrder