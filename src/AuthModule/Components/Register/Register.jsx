import React, { useState } from 'react'
import AuthForm from '../../../Components/SharedUI/AuthForm/AuthForm'
import Input from '../../../Components/SharedUI/Input'
import { Link } from 'react-router-dom'

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
  
  return (
    <div>

      <AuthForm
        title='Register'
        paragraph='Welcome Back! Please enter your details'  >
        <form action="">
          <div className='form-group d-flex justify-content-between gap-5 my-4'>
            <Input type='text' placeholder='UserName' Icon='fa-light fa-user' />
            <Input type='email' placeholder='Enter your E-mail' Icon='fa-light fa-envelope' />
          </div>
          <div className='form-group d-flex justify-content-between gap-5 my-4'>
            <Input type='text' placeholder='Country' Icon='fa-light fa-earth-oceania' />
            <Input type='text' placeholder='Phone Number' Icon='fa-light fa-mobile' />
          </div>
          <div className='form-group d-flex justify-content-between gap-5 my-2'>
            <Input type='password' placeholder='Password' Icon='fa-light fa-lock' />
            <Input type='password' placeholder='confirm-password' Icon='fa-light fa-lock' />
          </div>
          <div className='d-flex justify-content-end mt-2'>
            <Link to='/login' className=' text-decoration-none' style={{ color: '#4AA35A', fontSize: '16px',
              fontWeight: '500'
            }}>
              Log In ?
            </Link>
          </div>
          <div className='form-group my-3 d-flex justify-content-center'>
          <button type="submit" className="btn  w-75 " disabled={isLoading} style={{ backgroundColor: '#4AA35A', color: 'white' }}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Register"
            )}
          </button>
          </div>
        </form>
      </AuthForm>
    </div>
  )
}
