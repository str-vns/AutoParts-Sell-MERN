import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from '../Layout/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import { getToken } from '../../Utilitys/helpers';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ProductList() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [isDeleted, setIsDeleted] = useState(false)

    let navigate = useNavigate()
    const getAdminProducts = async () => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.get(`
            http://localhost:4000/api/v1/admin/products`, config)
            console.log(data)
            setProducts(data.products)
            setLoading(false)
        } catch (error) {

            setError(error.response.data.message)

        }
    }
    useEffect(() => {
        getAdminProducts()

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

        if (deleteError) {
            toast.error(deleteError, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

        if (isDeleted) {
            toast.success('Product deleted successfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            navigate('/admin/products');
            
            setIsDeleted(false)
            setDeleteError('')

        }

    }, [error, deleteError, isDeleted,])

    const deleteProduct = async (id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/product/${id}`, config)

            setIsDeleted(data.success)
            setLoading(false)
        } catch (error) {
            setDeleteError(error.response.data.message)

        }
    }



    const productsList = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
        deleteProduct(id)
    }
  return (
    <Fragment>
        <MetaData title={'All Products'} />
          <div className="flex bg-white">
    <div className="w-full md:w-1/6 h-full">
        <Sidebar />
    </div>


                <div className="w-full md:w-5/6">
                <div className="flex flex-col items-center bg-white">
                <h1 className="my-14 font-bold text-lg text-black mr-32">All Products</h1>
  <div className="">
  <button className="inline-block rounded-lg bg-black ml-[900px] px-5 py-3 mb-5 text-sm font-medium text-white hover:bg-white hover:text-black hover:border-black border-2" >
  <Link to="/CreateProduct" >Add Product </Link></button>
</div>
  <div className="flex w-full justify-center container pb-10 mr-40">
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
<MDBDataTable
    data={productsList()}
    className="table border-2  border-black shadow-lg py-10 text-black"
    bordered
    striped
    hover
    entriesOptions={[10, 20, 30]} 
    entries={10} 
    noBottomColumns
    

/>
      )}
    </Fragment>
</div>
                    </div>
                    </div>
                    </div>
                    </Fragment>
  )
}

export default ProductList