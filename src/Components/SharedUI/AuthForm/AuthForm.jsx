import React from 'react'
import logo from '../../../assets/imgs/logo.png'
import Input from '../Input'

export default function AuthForm({ backGroundwidth, title, paragraph, children }) {
  return (
    <>
      <div className='background-container row'>

        <div className='col-12 col-md-10 col-lg-8 m-auto bg-white p-2 rounded shadow'>
          {/* Logo Section */}
          <div className="text-center mb-3">
            <img src={logo} alt="logo" className="img-fluid" />
          </div>
          <div className='content '>
            <div className='mt-2  col-10  mx-auto title d-flex flex-column'>
              <h3>{title}</h3>
              <p>{paragraph}</p>

            </div>
            <div className='col-10 mx-auto form-container'>
              {children}
            </div>
          </div>

        </div>
      </div>
    </>

  )
}
