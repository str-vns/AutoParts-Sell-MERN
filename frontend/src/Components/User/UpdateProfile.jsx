import React, { Fragment, useState, useEffect } from 'react'
import Metadata from '../Layout/MetaData'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../Utilitys/helpers';

const UpdateProfile = () => {
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const [error, setError] = useState('')
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    let navigate = useNavigate();

    const getProfile = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }
        try {
            const { data } = await axios.get(`http://localhost:4000/api/v1/profile`, config)
            console.log(data)
            setName(data.user.name);
            setAvatarPreview(data.user.avatar.url)
            setLoading(false)
        } catch (error) {
            toast.error('User Cannot find', {
                position: 'top-right'
            });
        }
    }

    const updateProfile = async (userData) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }
        
        try {
            const formData = new FormData();
            Object.keys(userData).forEach(key => formData.append(key, userData[key]));
        
            const { data } = await axios.put(`http://localhost:4000/api/v1/profile/update`, formData, config)
            console.log('Response data:', data); 
            setIsUpdated(data.success)
            setLoading(false)
            toast.success('Profile Update Success', {
                position: 'top-right'
            });
            
            navigate('/profile', { replace: true })
        } catch (error) {
            
            if(avatar == '')
            {
                toast.error('Add Image', {
                    position: 'top-right'
                });
            }
            else{
                console.log('Error:', error); 
                toast.error(' Thier is an Error ', {
                    position: 'top-right'
                });
            }
           
        }
    }
    useEffect(() => {
        getProfile()

    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = {
            name,
      avatar ,
        };
        
        console.log('User data:', { name, avatar });
        updateProfile(formData);
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
             
                    setAvatar(reader.result);
             
            }
            
        }

        reader.readAsDataURL(e.target.files[0])

    }
    console.log(user)
    return (
        <Fragment>
            <Metadata title={'Update Profile'} />

            <div className="px-4 py-40 sm:px-6 lg:px-8 bg-white">
                <div className="mx-auto max-w-lg text-center border-2 p-10 border-black">
                    <form  onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="text-2xl font-bold sm:text-3xl text-black">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field" className='text-mg text-black text-left flex'>Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control mt-1 p-4 lg:w-full md:w-full sm:w-full rounded-md border-2 h-10 border-black bg-white text-sm text-gray-700 shadow-sm"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>


                        <div className='form-group'>
                            <label htmlFor='avatar_upload' className=' text-mg text-black text-left flex'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className=' rounded-circle w-16 h-16  object-cover p-10'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='hidden '
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label float-left px-4 py-2 border-2 border-black rounded-md cursor-pointer bg-white text-black hover:bg-black hover:text-white' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile