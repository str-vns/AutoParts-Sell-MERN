import React, { Fragment, useState,} from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import MetaData from '../Layout/MetaData'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState('')
    
    const navigate = useNavigate()

    const forgotPassword = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        try {
            const { data } = await axios.post(`http://localhost:4000/api/v1/password/forgot`, formData, config);
            console.log(data.message);
            setLoading(false);
            toast.success(data.message, {
                position: 'top-center',
            });
            navigate('/login');
        } catch (error) {
            console.error('Error:', error); 
            if (error.response) {
                console.error('Response Data:', error.response.data);
            }
            toast.error(error.response ? error.response.data.message : 'An error occurred', {
                position: 'top-center',
            });
        }
    };

    const validationSchema = Yup.object({

        email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      });
    
      const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: (values) => {
          console.log("Submitting Shipping with values:", values);
      
          try {
            submitHandler(values);
          window.location.reload()
          } catch (error) {
            console.error("Error Shipping review:", error);
          }
        },
      });

    const submitHandler = () => {

        const formData = new FormData();
        formData.set('email', email);
        forgotPassword(formData)
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
            <div className="flex flex-wrap justify-center items-center h-screen bg-white">
    <div className="p-10">
        <form className="shadow-lg rounded-xl bg-white ring ring-black m:p-6 lg:px-40 lg:py-10 flex flex-col items-center" onSubmit={submitHandler}>
            <h1 className="mb-3 text-xl text-black font-bold">Forgot Password</h1>
            <div className="form-group grid grid-cols-1">
                <label htmlFor="email_field" className="text-sm font-medium text-gray-700">Enter Email</label>
                <input
                    type="email"
                    id="email_field"
                    className="mt-1 p-4 w-full lg:w-[500px] rounded-md border-2 h-10 border-black bg-white text-sm text-gray-700"
                    value={formik.values.email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                      formik.setFieldValue("email", e.target.value);
                    }}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500 text-sm ml-3">
                      {formik.errors.email}
                    </div>
                  )}
            </div>

<div className='mt-2'>
            <button
                id="forgot_password_button"
                type="submit"
                className="btn btn-block py-3 mt-3 text-white hover:border-2 hover:border-black hover:bg-white hover:text-black"
                disabled={loading ? true : false}
                onClick={formik.handleSubmit}>
               
                Send Email
            </button>
            </div>
        </form>
    </div>
</div>


        </Fragment>
    )
}

export default ForgotPassword