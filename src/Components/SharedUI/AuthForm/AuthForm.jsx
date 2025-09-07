import React from 'react'
import logo from '../../../assets/imgs/logo.png'
import Input from '../Input'
import './AuthForm.css'

export default function AuthForm({ backGroundwidth, title, paragraph, children }) {
  return (
    <>
      <div className='background-container row min-vh-100 d-flex align-items-center justify-content-center'>
        <div className='col-11 col-sm-10 col-md-9 col-lg-8 col-xl-7 m-auto bg-white p-2 p-md-3 rounded shadow-lg' 
             style={{ 
               maxWidth: '800px',
               margin: '10px auto',
               borderRadius: '16px',
               boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
             }}>
          {/* Logo Section */}
          <div className="text-center mb-1">
            <img 
              src={logo} 
              alt="logo" 
              className="img-fluid" 
              style={{ 
                maxHeight: '60px',
                width: 'auto'
              }} 
            />
          </div>
          
          <div className='content'>
            <div className='mb-1 title text-center'>
              <h3 
                className="mb-1 fw-bold"
                style={{ 
                  color: '#2c3e50',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)'
                }}
              >
                {title}
              </h3>
              <p 
                className="text-muted mb-0"
                style={{ 
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.5'
                }}
              >
                {paragraph}
              </p>
            </div>
            
            <div className='form-container'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
