import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <div>
            <div className="block overflow-hidden group border border-black">
                <img
                    className="h-[350px] w-80 object-cover transition duration-500 group-hover:scale-105 sm:h-[350px]"
                    src={product.images[0].url}
                />
                <div className="relative pt-3 bg-white">
                    <h5 className="text-xs ml-3 text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        <a href="">{product.name}</a>
                    </h5>
                    <div className="ratings  text-xs text-gray-700  ">
                        <div className="rating-outer ">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews" className='ml-3'>({product.numOfReviews} reviews)</span>
                    </div>
                    <p className="mt-2 mb-2 tracking-wider ml-3 text-gray-900">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" > <button className="float-right border border-black inline-block px-4 py-2 mb-5 mr-5 text-sm font-medium text-gray-700 hover:bg-black  hover:text-white focus:relative ">View Details</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Product