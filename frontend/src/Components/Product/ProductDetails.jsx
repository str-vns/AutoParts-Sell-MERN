import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Loader from '../Layout/Loader'
import MetaData from '../Layout/MetaData'
import ReactGall from 'react-image-gallery'
import axios from 'axios'
import { toast, } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ cartProducts, addCart}) => {

    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState([])

   

    let { id } = useParams()
    let navigate = useNavigate()
  

    const productDetails = async (id) => {
        let link = `http://localhost:4000/api/v1/product/${id}`
        try {
            let res = await axios.get(link)
            setProduct(res.data.product)
            setLoading(false)

        } catch (err) {
            console.log(err)

            // setLoading(false)
            setError('Product not found')
            setLoading(false)
            // toast.error(error)
            // toast.error(err.response.data.message)
        }

    }
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }
  

    const addToCart = async () => {
        await addCart(id, quantity);
    }

   let images
    if (product && product.images) {
        images = product.images.map(image => ({
            original: image.url,
            thumbnail: image.url
        }));
    }
    
    useEffect(() => {
        productDetails(id)
        if (error) {
            toast.error(error, {
                position: 'top-right'
            });
            navigate('/')
        }
    }, [id, error,]);
    if (cartProducts !== undefined) {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      } else {
        console.error('cartProducts is undefined');
      }
    return (
        <Fragment>

            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="bg-white">
                        <section  className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10"id="product_image">
                        <div className="container mx-auto px-4">
                        
                        
                        <ReactGall
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={images}
        />
    
                            </div>
                      
                        </section>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            {/* {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" >
                                Submit Your Review
                            </button> 
                                :*/}
                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" >
                                Submit Your Review
                            </button>
                            <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            {/* } */}


                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

}
export default ProductDetails