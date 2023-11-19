import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MetaData from "../Layout/MetaData";
import Sidebar from "../Layout/Sidebar";
import { getToken } from "../../Utilitys/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateProducts = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const [error, setError] = useState('')
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [updateError, setUpdateError] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
  const { id } = useParams();

  const categories = [
    "Battery",
    "Car Suspension",
    "Turbo",
    "Brake",
    "Chassis",
    "Air Filter",
    "Axle",
    "Shock Absorber",
    "Hood",
    "Alternator",
    "Clutch",
    "Compressor",
    "Air suspension",
    "Brake Caliper",
    "Suspension",
    "Nitrous",
    "Exhaust",
    "Interior Seats",
    "Steering Wheel",
    "Car Rims",
    "Fluids",
  ];
  let navigate = useNavigate();
  const errMsg = (message = '') => toast.error(message, {
    position: "top-right"
});
const successMsg = (message = '') => toast.success(message, {
    position: "top-right"
});
  const getProductDetails =  async (id) => {
    try {
       const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`)
       setProduct(data.product)
       setLoading(false)
       
    } catch (error) {
        setError(error.response.data.message)
        
    }
}

  const updateProduct = async (id, productData)  => {
    try {
       
        const config = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${getToken()}`
            }
        }
        const { data } = await axios.put(`http://localhost:4000/api/v1/admin/product/${id}`, productData, config)
        setIsUpdated(data.success)
       
    } catch (error) {
        setUpdateError(error.response.data.message)
        
    }
}
const submitHandler = () => {

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('description', description);
    formData.set('category', category);
    formData.set('stock', stock);
    formData.set('seller', seller);
    images.forEach(image => {
        formData.append('images', image)
    })
    updateProduct(product._id, formData)
}

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
 

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    stock: Yup.number("Stock is required")
      .required("Stock is required"),
    seller: Yup.string().required("Seller name is required"),

  });

  const formik = useFormik({
    initialValues: {
        name: "product.name" || "",
        price: typeof product.price === 'number' ? product.price : product.price || 0,
        description: "product.description" || "",
        category: "product.category" || "",
        stock: typeof product.stock === 'number' ? product.stock : product.stock || 0,
        seller: "product.seller" || "",
  
      },
    validationSchema,
    onSubmit: (values) => {
      try {
        submitHandler(values);
        console.log("Submitting review with values:", values);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },
  });

  useEffect(() => {
    if (product && product._id !== id) {
        getProductDetails(id)
    } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setSeller(product.seller);
        setStock(product.stock)
        setOldImages(product.images)
    }
    if (error) {
        errMsg(error)
        
    }
    if (updateError) {
        errMsg(updateError);
       
    }
    if (isUpdated) {
        navigate('/ProductList');
        window.location.reload()
        successMsg('Product updated successfully');
       
    }
}, [error, isUpdated, updateError, product, id])

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      <div className="flex bg-white items-center justify-center ">
        <div className="w-72 md:w-1/6">
          <Sidebar />
        </div>

        <div className="w-72 md:w-5/6">
          <Fragment>
            <div className="wrapper my-5 items-center justify-center flex">
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                <h1 className="mb-4 text-2xl font-bold sm:text-3xl text-black">
                  New Product
                </h1>

                <div className="form-group">
                  <label
                    htmlFor="name_field"
                    className="text-mg text-black  text-left flex"
                  >
                    Name
                  </label>
                  <div className="flex items-center ">
                    <input
                      type="text"
                      id="name_field"
                      className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        formik.setFieldValue("name", e.target.value);
                      }}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div className="text-red-500 text-sm ml-3">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="price_field"
                    className="text-mg text-black text-left flex"
                  >
                    Price
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      step="0.01"
                      id="price_field"
                      className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                        formik.setFieldValue("price", e.target.value);
                      }}
                    />
                    {formik.errors.price && formik.touched.price && (
                      <div className="text-red-500 text-sm ml-3">
                        {formik.errors.price}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="description_field"
                    className="text-mg text-black  text-left flex"
                  >
                    Description
                  </label>
                  <div className="flex items-center">
                    <textarea
                      className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                      id="description_field"
                      rows="8"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        formik.setFieldValue("description", e.target.value);
                      }}
                    ></textarea>
                    {formik.errors.description &&
                      formik.touched.description && (
                        <div className="text-red-500 text-sm ml-3">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="category_field"
                    className="text-mg text-black  text-left flex"
                  >
                    Category
                  </label>
                  <div className="flex items-center">
                    <select
                      className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                      id="category_field"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        formik.setFieldValue("category", e.target.value);
                      }}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {formik.errors.category && formik.touched.category && (
                      <div className="text-red-500 text-sm ml-3">
                        {formik.errors.category}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="stock_field"
                    className="text-mg text-black  text-left flex"
                  >
                    Stock
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="stock_field"
                      className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                      value={stock}
                      onChange={(e) => {
                        setStock(e.target.value);
                        formik.setFieldValue("stock", e.target.value);
                      }}
                    />
                    {formik.errors.stock && formik.touched.stock && (
                      <div className="text-red-500 text-sm ml-3">
                        {formik.errors.stock}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="seller_field"
                    className="text-mg text-black  text-left flex"
                  >
                    Seller Name
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                      value={seller}
                      onChange={(e) => {
                        setSeller(e.target.value);
                        formik.setFieldValue("seller", e.target.value);
                      }}
                    />
                    {formik.errors.seller && formik.touched.seller && (
                      <div className="text-red-500 text-sm ml-3">
                        {formik.errors.seller}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className=" text-mg text-black  text-left flex mb-2">
                    Images
                  </label>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="images"
                        className="custom-file-input hidden"
                        id="customFile"
                        onChange={onChange}
                        multiple
                      />
              
                    <label
                      htmlFor="customFile"
                      className="px-4 py-2 border-2  border-black rounded-md cursor-pointer bg-white text-black hover:bg-black hover:text-white"
                    >
                      Choose Images
                    </label>

                    
                  </div>
                  <div className="flex flex-row mb-2">
                    {imagesPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="Images Preview"
                        className="my-3 mr-2 "
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn inline-block my-2 rounded-lg bg-black  py-3 w-[150px] text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2"
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
  
}

export default UpdateProducts