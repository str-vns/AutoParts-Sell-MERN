import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '../Layout/Sidebar';
import MetaData from '../Layout/MetaData';
import { MDBDataTable } from 'mdbreact'
import axios from 'axios';
import { getUser, getToken, } from '../../Utilitys/helpers'
import { toast } from 'react-toastify';
import Sweet from 'sweetalert2'
const ReviewsProduct = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productId, setProductId] = useState('');
  const [listReviews, setListReviews] = useState([])
  const [deleteError, setDeleteError] = useState('')
  const [isDeleted, setIsDeleted] = useState(false)
  const [user, setUser] = useState(getUser())

  const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    }
}

const getProductReviews = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/reviews?id=${id}`, config);
  
      if (response && response.data) {
        setListReviews(response.data.reviews)
        setReviews(response.data.reviews);
        console.log(response.data.reviews)
      } else {
        console.error('API response or data is undefined', response);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/products`);
      setProducts(data.products);
      if (data.products.length > null && productId === '') {
        setProductId(data.products[0]._id); 
      }
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const deleteReview = async (id, productId) => {
    try {
      const { data } = await axios.delete(`http://localhost:4000/api/v1/reviews?id=${id}&productId=${productId}`, config);
      if (data && data.success) {
        setIsDeleted(data.success);
      } else {
        console.error('Delete request failed:', data);
      }
    } catch (error) {
      console.error('Error during delete request:', error);
      setDeleteError(error.response ? error.response.data.message : 'An error occurred');
    }
  };
const swalWithBootstrapButtons = Sweet.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

const deleteReviewHandler = (id) => {
    swalWithBootstrapButtons.fire({
        title: "Are you sure to Delete this review?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat-poptart-cat.gif")
        left top
        no-repeat
      `
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Review has been deleted.",
            icon: "success"
          });
          
          deleteReview(id, productId)
        }  else if (
           
            result.dismiss === Sweet.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Review is safe :)",
              icon: "error"
            });
          }
       
    })

}

  const submitHandler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
    console.log(productId)
  };

  useEffect(() => {
    if (error) {
        toast.error('error fetching reviews', 'error',
        {postion: "top-right"}
        )
        setError('')
    }

    if (deleteError) {
        toast.error(deleteError, 'error' ,
        {postion: "top-right"});
        setDeleteError('')
    }

    if (productId !== '') {
        getProductReviews(productId)
    }

    if (isDeleted) {
        toast.success('Review deleted successfully', 'success' ,
        {postion: "top-right"});
        setIsDeleted(false)
    }

    getProductDetails();
  
  }, [error, productId, isDeleted, deleteError]); 

  const setReviewer = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };
  
    listReviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions: (
          <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });
  
    return data;
  };

  return (
    <Fragment>
    <MetaData title={'All Reviews'} />
    <div className="flex bg-white ">
      <div className="w-full md:w-1/6 h-full ">
        <Sidebar />
      </div>
      <div className="w-full md:w-5/6 mr-52">
        <div className="flex flex-col items-center bg-white">
          <h1 className="my-14 font-bold text-lg text-black mr-32">Reviewed Product</h1>
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="product_field" className="text-mg text-black text-left flex">
                Product Review
              </label>
              <div className="flex items-center">
              <select
  className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white mb-10"
  id="product_field"
  value={productId}
  onChange={(e) => {
    setProductId(e.target.value);
    console.log('Selected product ID:', e.target.value); 
  }}
  style={{ maxHeight: '150px', overflowY: 'auto' }}
>
  {products.map((product) => (
    <option key={product._id} value={product._id}>
      {product.name}
    </option>
  ))}
</select>
              </div>
            </div>

          </form>
        </div>
        <div className="flex w-full justify-center container pb-10 ">
          <Fragment>
            {listReviews && listReviews.length > 0 ? (
              <MDBDataTable
                data={setReviewer()} 
                className="table border-2  border-black shadow-lg py-10 text-black"
                bordered
                striped
                hover
                entriesOptions={[10, 20, 30]}
                entries={10}
                noBottomColumns
              />
            ) : (
              <p className="mt-5 text-center">No Reviews.</p>
            )}
          </Fragment>
        </div>
      </div>
    </div>
  </Fragment>
  );
};

export default ReviewsProduct;