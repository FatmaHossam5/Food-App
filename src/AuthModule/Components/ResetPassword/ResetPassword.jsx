import React from 'react'
import logo from '../../../assets/imgs/logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
     const {register,handleSubmit,formState:{errors}}=useForm()
   
       const navigate=useNavigate()
   
     const onSubmit =(data)=>{
       axios.post('https://upskilling-egypt.com:443/api/v1/Users/Reset',data).then((response)=>{
        toast("Done!")
      
        navigate('/login')
        
       }).catch((error)=>{
       toast(error.response.data.message);
       })
     }
  return (<>
  <div className="Auth-container">
          
        <div className="row bg-overlay  vh-100">
            <div className="col-md-6 m-auto">
                <div className="bg-white p-2" >
                    <div className="img text-center ">
                        <img src={logo} className='w-25' alt="logo" />
                    </div>
                  
                    <form className='w-75 m-auto'  onSubmit={handleSubmit(onSubmit)}>
              
                    <h3> Reset  Password</h3>
                    <p>Please Enter Your Otp  or Check Your Inbox</p>
                      
                          <div className="form-group my-3">
                        <input className='form-control email px-4 ' type="email" placeholder='Enter your E-mail'
                        {...register("email",{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}/>
                      {errors.email&&errors.email.type==="required"&&(<span className='text-danger'>email is required</span>)}
                      <i className="fa-regular fa-envelope left-icon"></i>
                        </div>
                        <div className="form-group my-3">
                        <input className='form-control my-2'  placeholder='OTP'
                        {...register("seed",{required:true})}
                        />
                        {errors.seed&&errors.seed.type==="required"&&(<span className='text-danger '>OTP is required</span>)}
                        </div>
                      
                        <div className="form-group my-3">
                        <input className='form-control' type="password" placeholder='New Password'
                        {...register("password",{required:true})}
                        />
                              <i className="fa-solid fa-lock  left-icon"></i>
                        {errors.password&&errors.password.type==="required"&&(<span className='text-danger'> Password is required</span>)}
                        </div>
                        <div className="form-group my-3">
                        <input className='form-control' type="password" placeholder='confirm New Password'name='confirmNewPassword'
                        {...register("confirmPassword",{required:true})}
                        />
                              <i className="fa-solid fa-lock  left-icon"></i>
                        {errors.confirmPassword&&errors.confirmPassword.type==="required"&&(<span className='text-danger'> Required </span>)}
                        </div>
                      
                      <button className='bg-success form-control text-white'>Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </>

  )
}
