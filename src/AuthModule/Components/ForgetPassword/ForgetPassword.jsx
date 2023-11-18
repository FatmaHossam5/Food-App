import React from 'react'
import { useForm } from 'react-hook-form'
import logo from "../../../assets/imgs/4 3.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
   const{register,handleSubmit,formState:{errors}}=useForm();
   let baseUrl='http:// upskilling-egypt.com:3002 ';
   let navigate=useNavigate()
   const onSubmit=(data)=>{
 
    axios.put(baseUrl+'/api/v1/Users/ChangePassword',data,{headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`
    }}).then((response)=>{console.log(response)
      navigate('/login')
      ;}).catch((error)=>{
        console.log(error.response.data.message);
      })



   }
  return (
    <div className="Auth-container">
    <div className="row bg-overlay  vh-100">
        <div className="col-md-6 m-auto">
            <div className="bg-white" >
            <div className="img text-center ">
                        <img src={logo} className='w-25' alt="logo" />
                    </div>
                  
                    <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)} >
              
                    <h3>Change Your Password</h3>
                    <p> Enter your details below</p>
                        <div className="form-valid my-3">
                        <input className='form-control email ' type="Password" placeholder='oldPassword'
                        {...register("oldPassword",{required:true,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
                         />
                         {errors.oldPassword&&errors.oldPassword.type==="required"&&(<span className='text-danger'>oldPassword is required</span>)}
                    
                        </div>
                        <div className="form-valid my-3">
                        <input className='form-control' type="password" placeholder='newPassword'{...register("newPassword",{required:true})}
                        />
                           {errors.newPassword&&errors.newPassword.type==="required"&&(<span className='text-danger'>newPassword is required</span>)}
                        </div>
                        <div className="form-valid my-3">
                        <input className='form-control' type="password" placeholder='confirmNewPassword'{...register("confirmNewPassword",{required:true})}
                        />
                           {errors.confirmNewPassword&&errors.confirmNewPassword.type==="required"&&(<span className='text-danger'>confirmNewPassword is required</span>)}
                        </div>
                        
                      <button className='bg-success form-control text-white my-2'>ChangePassword</button>
                    </form>
            </div>
        </div>
    </div>
</div>
  )
}
