import React, { useState } from 'react'
import logo from '../../../assets/imgs/4 3.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ({handleClose}) {
 const{register,handleSubmit,formState:{errors}} =useForm();

  const navigate=useNavigate()
 const onSubmit= (data)=>{
  console.log(data);
  axios.put("http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword",data,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`
    }
  }).then((response)=>{
 
    handleClose()
  }).catch((error)=>{
    toast(error?.response?.data?.message);
  
})
 }
  return (
    <div>
            
    <div className="row bg-danger-subtle   ">
        <div >
            <div className="bg-white p-2" >
                <div className="img text-center ">
                    <img src={logo} className='w-50' alt="logo" />
                </div>
              
                <form className='w-75 m-auto'onSubmit={handleSubmit(onSubmit)} >
          
                <h3>Log In</h3>
                <p className='text-color'>welcome Back!Please enter your details</p>
                    <div className="form-valid my-3">
                    <input className='form-control email  px-4 ' type="password" placeholder='old Password'
                   {...register("oldPassword",{required:true})}
                     />
                     {errors.oldPassword&&errors.oldPassword.type==='required'&&(<span className='text-danger'>old password is required</span>)}
                     <i class="fa-solid fa-mobile"></i>
                    </div>
                    <div className="form-valid my-3">
                    <input className='form-control  px-4' type="password" placeholder='New Password'
                    {...register("newPassword",{required:true})}
                    />
                     {errors.newPassword&&errors.newPassword.type==='required'&&(<span className='text-danger'>newPassword is required</span>)}
                       <i class="fa-solid fa-lock"></i>
                    </div>
                 
                    <div className="form-valid my-3">
                    <input className='form-control  px-4' type="password" placeholder=' Confirm New Password'
                    {...register("confirmNewPassword",{required:true})}
                    />
                     {errors.confirmNewPassword&&errors.confirmNewPassword.type==='required'&&(<span className='text-danger'>confirmNewPassword is required</span>)}

                       <i class="fa-solid fa-lock"></i>
                    </div>
                  <button className='bg-success form-control text-white logBtn my-'>Change Password</button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}
