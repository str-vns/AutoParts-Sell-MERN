import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import { useParams, useNavigate } from 'react-router-dom'

function Carts({ addCart, cartProducts, removeCart }) {
    const navigate = useNavigate()

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        addCart(id, newQty);
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        addCart(id, newQty);
    }

    const removeCartItemHandler = (id) => {
        removeCart(id)
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=shippings')
    }
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))

    return (
        <Fragment>
      <section className='bg-white p-10 '>
        <div className="mx-auto max-w-3xl ">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3x ">Your Cart</h1>
          </header>

          <div>
          {cartProducts.map((item) => (
        <Fragment key={item.product}>
          <hr />

          <div className='  pb-7 ' key={item.product}>
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
                      <button  className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75" onClick={() => decreaseQty(item.product, item.quantity)}>
                        -
                      </button>

                      <input
                        type="number"
                        className="form-control count h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        value={item.quantity}
                        readOnly
                      />

                      <button  className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>
                        +
                      </button>
                    </div>
                 
                    <button class="text-gray-600 transition hover:text-red-600 " onClick={() => removeCartItemHandler(item.product)}>
                <span class="sr-only" >Remove item</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
                    
              
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Fragment>
      ))}
          </div>

          <div className=" flex justify-end border-t border-gray-100 pt-8">
          <div className="w-screen max-w-lg space-y-4">
                 <dl className="space-y-0.5 text-sm text-gray-700">
            <div id="order_summary">
              <h4>Product Total</h4>
             
              
              <div className='flex justify-between !text-base font-medium'>
              <dt> Subtotal:</dt>
              <dd>{cartProducts.reduce((acc, item) => acc + Number(item.quantity), 0)} (Units)</dd>
              </div>
           
              <div className='flex justify-between !text-base font-medium'>
              <dt> Est. total:</dt>
              <dd>${cartProducts.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</dd>
              </div>
              </div>
 </dl>
              <hr />
              <div className="flex justify-end">
              <button id="checkout_btn" className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600" onClick={checkoutHandler}>
                Check out
              </button>
              </div>
          </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};


export default Carts