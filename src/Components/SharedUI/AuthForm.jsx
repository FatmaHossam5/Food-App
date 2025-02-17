import React from 'react'
import logo from '../../../src/assets/imgs/logo.png'
import Input from './Input'

export default function AuthForm({ backGroundwidth }) {
  return (
    <>
      <div className='background-container row'>

        <div className='col-lg-5 m-auto bg-white'>
          <div className='d-flex justify-content-center align-items-center'>
            <img src={logo} alt="logo" />
          </div>
          <div className='content '>
          <div className='mt-2  col-10  mx-auto title d-flex flex-column'>
            <h3>Log In</h3>
            <p>Welcome Back! Please enter your details</p>

          </div>
          <div className='col-10 mx-auto form-container'>
            <Input placeholder='Enter your E-mail' />
          </div>
          </div>
     
        </div>
      </div>
    </>

  )
}
