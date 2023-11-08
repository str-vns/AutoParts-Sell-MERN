import React, { Fragment, useState, useEffect } from 'react'
import Metadata from '../Layout/MetaData'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../Utilitys/helpers';

const UpdateProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
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

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>


                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
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