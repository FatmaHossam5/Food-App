import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthForm from '../../../Components/SharedUI/AuthForm/AuthForm'
import Input from '../../../Components/SharedUI/Input'
import Button from '../../../Components/SharedUI/Button'



export default function Login({ saveAdminData }) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)



  const Login = (data) => {

    setIsLoading(true);
    
    axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data)
    
    .then((response) => {
      console.log(response);
      
      toast.success('login successfully!');
      localStorage.setItem("adminToken", response?.data?.token)
      saveAdminData()
      navigate('/dashboard')

      }).catch((error) => {
        toast.error(error.response.data.message);
      }).finally(() => {
        setIsLoading(false)
      })
  }





  return (
    <AuthForm
      title="Log In"
      paragraph="Welcome back! Please enter your details"
    >
      <form onSubmit={handleSubmit(Login)} className="d-flex flex-column" role="form" aria-label="Login form">
        {/* Email Input */}
        <div className="form-field">
          <label htmlFor="email" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
            Email Address <span className="text-danger">*</span>
          </label>
          <Input 
            placeholder="Enter your email address" 
            type="email" 
            Icon="fa-solid fa-envelope" 
            name="email"
            id="email"
            className={errors.email ? 'error-input' : ''}
            aria-label="Email address"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })} 
          />
          {errors.email && (
            <div id="email-error" className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }} role="alert">
              <i className="fa-solid fa-exclamation-circle me-1" aria-hidden="true"></i>
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        {/* Password Input */}
        <div className="form-field">
          <label htmlFor="password" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
            Password <span className="text-danger">*</span>
          </label>
          <Input 
            placeholder="Enter your password" 
            type="password" 
            Icon="fa-solid fa-lock" 
            name="password"
            id="password"
            className={errors.password ? 'error-input' : ''}
            aria-label="Password"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })} 
          />
          {errors.password && (
            <div id="password-error" className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }} role="alert">
              <i className="fa-solid fa-exclamation-circle me-1" aria-hidden="true"></i>
              <span>{errors.password.message}</span>
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className='d-flex flex-row justify-content-between align-items-center gap-3 mt-1'>
          <Link 
            to="/register" 
            className="text-decoration-none fw-medium register-link"
            style={{ 
              fontSize: '0.9rem',
              color: '#4AA35A',
              transition: 'all 0.3s ease',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none !important',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(74, 163, 90, 0.1)';
              e.target.style.borderColor = '#4AA35A';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 2px 8px rgba(74, 163, 90, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <i className="fa-solid fa-user-plus me-2"></i>
            <span><strong>Register</strong></span>
          </Link>
          <Link 
            to="/forgetPassword" 
            className="text-decoration-none fw-medium forgot-password-link"
            style={{ 
              color: '#4AA35A', 
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none !important',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(74, 163, 90, 0.08)';
              e.target.style.borderColor = 'rgba(74, 163, 90, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <i className="fa-solid fa-key me-2"></i>
            <span>Forgot Password?</span>
          </Link>
        </div>

        {/* Submit Button */}
        <div className="mt-1">
          <Button 
            type='submit' 
            title={isLoading ? 'Signing In...' : 'Sign In'} 
            isLoading={isLoading}
            aria-label={isLoading ? 'Signing in, please wait' : 'Sign in to your account'}
          />
        </div>
      </form>
    </AuthForm>
  )
}
