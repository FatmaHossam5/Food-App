import React from 'react'
import logo from "../../../assets/imgs/4 3.png"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login({saveAdminData}) {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const baseUrl= "http://upskilling-egypt.com:3002";
    const navigate=useNavigate()
const onSubmit =(data)=>{
axios.post(baseUrl+'/api/v1/Users/Login',data).then((response)=>{
    localStorage.setItem("adminToken",response.data.token)
    saveAdminData()
   
    navigate('/dashboard')
}).catch((error)=>{
    toast(error.response.data.message);
})
}





  return (
    <div className="Auth-container">
              <ToastContainer />
        <div className="row bg-overlay  vh-100">
            <div className="col-md-6 m-auto">
                <div className="bg-white p-2" >
                    <div className="img text-center ">
                        <img src={logo} className='w-25' alt="logo" />
                    </div>
                  
                    <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)} >
              
                    <h3>Log In</h3>
                    <p>welcome Back!Please enter your details</p>
                        <div className="form-valid my-3">
                        <input className='form-control email ' type="email" placeholder='Enter your E-mail'
                        {...register("email",{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
                         />
                         {errors.email&&errors.email.type==="required"&&(<span className='text-danger'>email is required</span>)}
                    
                        </div>
                        <div className="form-valid my-3">
                        <input className='form-control' type="password" placeholder='password'{...register("password",{required:true})}
                        />
                           {errors.password&&errors.password.type==="required"&&(<span className='text-danger'>password is required</span>)}
                        </div>
                        <div className="form-group  my-3 position-relative d-flex justify-content-end">
                            <Link to ="/RequestResetPassword" className='text-success'> Forget Password?</Link>
                        </div>
                      <button className='bg-success form-control text-white'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
//eng.fatma.fateh@gmail.com
//FatmaHossam5$
///^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
///^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,