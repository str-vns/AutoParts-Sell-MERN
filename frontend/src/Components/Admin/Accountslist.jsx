import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from '../Layout/Sidebar'
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../Utilitys/helpers';

const Accountslist = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [isDeleted, setIsDeleted] = useState('')
    let navigate = useNavigate();
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${getToken()}`
        }
    }
    const listUsers = async () => {
        try {

            const { data } = await axios.get(`http://localhost:4000/api/v1/admin/users`, config)
            setAllUsers(data.users)
            setLoading(false)

        } catch (error) {
            setError(error.response.data.message)
            console.log(error.response.data.message)
            
        }
    }
    const deleteUser = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`, config)
            setIsDeleted(data.success)
            setLoading(false)
            window.location.reload();
        } catch (error) {
           setError(error.response.data.message)
           setError()
            
        }
    }

    useEffect(() => {
        listUsers();
        if (error) {
           console.log(error);
            setError('')
        }
        if (isDeleted) {

            toast.success("User deleted successfully", {
                position:"top-right",
              }); 
              
            navigate('/AccountList');
            window.location.reload();
        }

    }, [error, isDeleted,])


    const deleteUserHandler = (id) => {
       deleteUser(id)
    }
    const accountlist = () => {
        const data = {
            columns: [
                {
                   label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        allUsers.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: <Fragment>
                    <Link to={`/AccountUpdate/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data;
    }
  return (
    <Fragment>
    <MetaData title={"All Accounts"} />
    <div className="flex bg-white">
      <div className="w-full md:w-1/6 h-full">
        <Sidebar />
      </div>

      <div className="w-full md:w-5/6">
        <div className="flex flex-col items-center bg-white">
          <h1 className="my-14 font-bold text-lg text-black mr-32">
          All Accounts
          </h1>
      
          <div className="flex w-full justify-center container pb-10 mr-40">
            <Fragment>
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={accountlist()}
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

export default Accountslist