import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import MetaData from '../Layout/MetaData'
import Sidebar from '../Layout/Sidebar'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../Utilitys/helpers';
import axios from 'axios';

const AccountUpdate = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [user, setUser] = useState(true)
    const [isUpdated, setIsUpdated] = useState(false)
    let navigate = useNavigate();

    const { id } = useParams();
    const config = {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${getToken()}`
        }
    }
    const getUserInfo = async (id) => {
    
        try {
            const { data } = await axios.get(`http://localhost:4000/api/v1/admin/user/${id}`,config)
            setUser(data.user)
            setLoading(false)
            
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const updateUser = async (id, userData) => {
        try {
            const { data } = await axios.put(`http://localhost:4000/api/v1/admin/user/${id}`, userData, config)
            setIsUpdated(data.success)
            setLoading(false)
            
        } catch (error) {
           setError(error.response.data.message)
        }
    }

    useEffect(() => {

        if (user && user._id !== id) {
            getUserInfo(id)
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role)
        }
        if (error) {
            errMsg(error);
            setError('');
        }
        if (isUpdated) {
            toast.success('User updated successfully',{
                position:"top-right",
            });

            navigate('/AccountList')
            window.location.reload();
        }
    }, [error, isUpdated, id, user])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);
        updateUser(user._id, formData)
    }

    return (
        <Fragment>
        <MetaData title={`User Update`} />
        <div className="flex bg-white items-center justify-center ">
        <div className="w-72 md:w-1/6">
          <Sidebar />
        </div>
      
          <div className="w-72 md:w-5/6">
            <div className="wrapper my-5 items-center justify-center flex">
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <h1 className="mb-4 text-2xl font-bold sm:text-3xl text-black">
                  User Update
                </h1>
      
                <div className="form-group">
                  <label htmlFor="name_field" className="text-mg text-black  text-left flex">
                    Name
                  </label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
      
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
      
                <div className="form-group">
                  <label htmlFor="role_field">Role</label>
                  <select
                    id="role_field"
                    className="form-control w-72 rounded-lg border-2 text-black border-black p-2 text-sm shadow-sm bg-white"
                    name='role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
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
          </div>
        </div>
      </Fragment>
      
    )
}

export default AccountUpdate