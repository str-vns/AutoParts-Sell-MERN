import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../Layout/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getToken } from '../../Utilitys/helpers';

const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const updatePassword = async (formData) => {
        console.log(formData)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const { data } = await axios.put(`http://localhost:4000/api/v1/password/update`, formData, config)
            setIsUpdated(data.success)
            setLoading(false)
       
            toast.success('password updated', {
                position: 'top-right'
            });
            navigate('/profile')
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
            console.log(error);
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'top-right'
            });
        }
    }, [error, ])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        updatePassword(formData)
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />

            <div className="px-4 py-40 sm:px-6 lg:px-8 bg-white">
                <div className="mx-auto max-w-lg text-center border-2 p-10 border-black">
                    <form onSubmit={submitHandler} >
                        <h1 className="text-2xl font-bold sm:text-3xl text-black">Update Password</h1>
                        <div className="form-group mx-auto mb-0 mt-8 max-w-md space-y-4">
                            <label htmlFor="old_password_field" className=' text-mg text-black pl-2'>Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group mx-auto mb-0 mt-8 max-w-md space-y-4">
                            <label htmlFor="new_password_field" className=' text-mg text-black pl-2'>New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control w-full rounded-lg border-2 text-black border-black p-4 text-sm shadow-sm bg-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="inline-block rounded-lg bg-black px-5 py-3 mt-5 text-sm font-medium text-white hover:border-2 hover:border-black hover:bg-white hover:text-black" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdatePassword