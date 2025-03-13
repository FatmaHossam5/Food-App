import React, { useState } from 'react'
import AuthForm from '../../../Components/SharedUI/AuthForm/AuthForm'
import Input from '../../../Components/SharedUI/Input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
      const [isLoading, setIsLoading] = useState(false)
      const{handleSubmit,register,formState:{errors}}=useForm();
      const navigate=useNavigate()
      const onSubmit=(data)=>{
        console.log(data)
        navigate('/ResetPassword')
      }
  
  return (
    <div>
      <AuthForm
        title='Forgot Your Password?'
        paragraph='No worries! Please enter your email and we will send a password reset link '>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
          <div className='form-group d-flex justify-content-between '>
            <Input type='email' placeholder='Enter your email' Icon='fa-light fa-envelope' className='py-2' />
            </div>
            <div className='form-group my-4 d-flex justify-content-center'>
          <button type="submit" className="btn  w-100" disabled={isLoading} style={{ backgroundColor: '#4AA35A', color: 'white' }}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Submit"
            )}
          </button>
          </div>
          </form>
        
      </AuthForm>


    </div>
  )
}
