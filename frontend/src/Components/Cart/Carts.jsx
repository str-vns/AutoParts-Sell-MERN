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
            <MetaData title={'Your Cart'} />
            {cartProducts.length === 0 ? <h2 className="mt-5">Your Cart is Empty</h2> : (
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{cartProducts.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">

                            {cartProducts.map(item => (
                                <Fragment>
                                    <hr />

                                    <div className="cart-item" key={item.product}>
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt="Laptop" height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>

                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)} ></i>
                                                {/* <i id="delete_cart_item" className="fa fa-trash btn btn-danger" ></i> */}
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))}

                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartProducts.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartProducts.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>


                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                                {/*<button id="checkout_btn" className="btn btn-primary btn-block" >Check out</button>*/}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Carts