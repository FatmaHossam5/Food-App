import React from 'react'
import logo from '../../../assets/imgs/4 3.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RequestResetPassword() {
     const navigate=useNavigate()
    const baseUrl='http://upskilling-egypt.com:3002'
    const {register,handleSubmit,formState:{errors}}=useForm()
    const onSubmit =(data)=>{
       axios.post(baseUrl+'/api/v1/Users/Reset/Request',data).then((response)=>{
      toast("check your email")
        navigate('/ResetPassword')
       }).catch((error)=>{
       toast(error.response.data.message);
       })
    }
  return (
 
         <div className="Auth-container">
            
        <div className="row bg-overlay  vh-100">
            <div className="col-md-6 m-auto">
                <div className="bg-white p-2" >
                    <div className="img text-center ">
                        <img src={logo} className='w-50' alt="logo" />
                    </div>
                  
                    <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)} >
              
                    <h3>Request Reset  Password</h3>
                    <p className='text-color'>Please Enter Your Email And Check Your Inbox</p>
                        <div className="form-valid my-3">
                        <input className='form-control email px-4 ' type="email" placeholder='Enter your E-mail'
                        {...register("email",{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}/>
                      {errors.email&&errors.email.type==="required"&&(<span className='text-danger'>email is required</span>)}
                      <i class="fa-regular fa-envelope"></i>
                        </div>
                    
                      
                      <button className='bg-success form-control text-white my-3'>send</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

  )
}
