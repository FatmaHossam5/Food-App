import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthForm from '../../../Components/SharedUI/AuthForm/AuthForm'
import Input from '../../../Components/SharedUI/Input'



export default function Login({ saveAdminData }) {
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)



  const Login = (data) => {
    alert('jjjj')
    console.log(data);
    
    setIsLoading(true);

    axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data)

      .then((response) => {

        localStorage.setItem("adminToken", response?.data?.token)
        saveAdminData()
        setIsLoading(true)
        navigate('/dashboard')

      }).catch((error) => {

        toast(error.response.data.message);

      }).finally(() => {
        setIsLoading(false)
      })
  }





  return (

    <AuthForm
      title="Log In"
      paragraph="Welcome back! Please enter your details"
    >
      <form onSubmit={handleSubmit(Login)} className="d-flex flex-column gap-3">
        {/* Email Input */}
        <Input placeholder="Enter Your Email" type="email" Icon="fa-light fa-mobile-notch"  name="email" 
          {...register('email', { required: true })} />
        {/* Password Input */}
        <Input placeholder="Password" type="password" Icon="fa-light fa-lock"    name="password" 
          {...register('password', { required: true })} />
        <div className='d-flex justify-content-between mt-1'>
          <h6>
            <Link to="/register" className="text-dark text-decoration-none">
              Register Now?
            </Link>
          </h6>
          <h6 style={{ color: '#4AA35A' }}>
            <Link to="/forgetPassword" className="text-success text-decoration-none">
              Forgot Password?
            </Link>
          </h6>
        </div>

        {/* Submit Button */}
        <div className='my-3'>
          <button type="submit" className="btn btn-success w-100" disabled={isLoading} style={{ backgroundColor: '#4AA35A', color: 'white' }}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Log In"
            )}
          </button>
        </div>

      </form>
    </AuthForm>
  )
}
