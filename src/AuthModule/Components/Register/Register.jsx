import React, { useState } from 'react'
import AuthForm from '../../../Components/SharedUI/AuthForm/AuthForm'
import Input from '../../../Components/SharedUI/Input'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../../../Components/SharedUI/Button';
import { toast } from 'react-toastify';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const handleRegister = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`https://upskilling-egypt.com:3006/api/v1/Users/Register`, data)
      toast.success(response.data.message)
    }
    catch (err) {

      if (err.response && err.response.data.message) {
        setError("userName", {
          type: "manual",
          message: "The username or email already exists in the database."
        });
        setError("email", {
          type: "manual",
          message: "The username or email already exists in the database."
        });
        toast.error(err.response.data.message);
      } else {
        toast.error("Registration failed.");
      }
    } finally {
      setIsLoading(false)

    }
  }

  return (
    <AuthForm
      title="Register"
      paragraph="Welcome! Please enter your details to create an account"
    >
      <form onSubmit={handleSubmit(handleRegister)} className="d-flex flex-column" role="form" aria-label="Registration form">
        {/* First Row: UserName and Email */}
        <div className="d-flex gap-4 mb-3 mt-2">
          {/* UserName Input */}
          <div className="form-field flex-fill">
            <label htmlFor="userName" className="form-label fw-semibold mb-2" style={{ color: '#2c3e50', fontSize: '14px' }}>
              User Name <span className="text-danger">*</span>
            </label>
            <Input 
              placeholder="Enter your username" 
              type="text" 
              Icon="fa-solid fa-user" 
              name="userName"
              id="userName"
              className={errors.userName ? 'error-input' : ''}
              aria-label="Username"
              aria-invalid={errors.userName ? 'true' : 'false'}
              aria-describedby={errors.userName ? 'userName-error' : undefined}
              {...register('userName', {
                required: "User name is required",
                maxLength: { value: 8, message: "The userName may not be greater than 8 characters." },
                pattern: {
                  value: /^[A-Za-z]+[0-9]+$/,
                  message: "The userName must contain characters and end with numbers without spaces."
                },
              })} 
            />
            {errors.userName && (
              <div id="userName-error" className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }} role="alert">
                <i className="fa-solid fa-exclamation-circle me-1" aria-hidden="true"></i>
                <span>{errors.userName.message}</span>
              </div>
            )}
          </div>

          {/* Email Input */}
          <div className="form-field flex-fill">
            <label htmlFor="email" className="form-label fw-semibold mb-2 " style={{ color: '#2c3e50', fontSize: '14px' }}>
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
        </div>

        {/* Second Row: Country and Phone Number */}
        <div className="d-flex gap-3 mb-3">
          {/* Country Input */}
          <div className="form-field flex-fill">
            <label htmlFor="country" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
              Country <span className="text-danger">*</span>
            </label>
            <Input 
              placeholder="Enter your country" 
              type="text" 
              Icon="fa-solid fa-globe" 
              name="country"
              id="country"
              className={errors.country ? 'error-input' : ''}
              aria-label="Country"
              aria-invalid={errors.country ? 'true' : 'false'}
              aria-describedby={errors.country ? 'country-error' : undefined}
              {...register('country', { 
                required: 'Country is required'
              })} 
            />
            {errors.country && (
              <div id="country-error" className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }} role="alert">
                <i className="fa-solid fa-exclamation-circle me-1" aria-hidden="true"></i>
                <span>{errors.country.message}</span>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="form-field flex-fill">
            <label htmlFor="phoneNumber" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
              Phone Number <span className="text-danger">*</span>
            </label>
            <Input 
              placeholder="Enter your phone number" 
              type="text" 
              Icon="fa-solid fa-phone" 
              name="phoneNumber"
              id="phoneNumber"
              className={errors.phoneNumber ? 'error-input' : ''}
              aria-label="Phone number"
              aria-invalid={errors.phoneNumber ? 'true' : 'false'}
              aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
              {...register('phoneNumber', { 
                required: 'Phone number is required'
              })} 
            />
            {errors.phoneNumber && (
              <div id="phoneNumber-error" className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }} role="alert">
                <i className="fa-solid fa-exclamation-circle me-1" aria-hidden="true"></i>
                <span>{errors.phoneNumber.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Third Row: Password and Confirm Password */}
        <div className="d-flex gap-3 mb-3">
          {/* Password Input */}
          <div className="form-field flex-fill">
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
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
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

          {/* Confirm Password Input */}
          <div className="form-field flex-fill">
            <label htmlFor="confirmPassword" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
              Confirm Password <span className="text-danger">*</span>
            </label>
            <Input 
              placeholder="Confirm your password" 
              type="password" 
              Icon="fa-solid fa-lock" 
              name="confirmPassword"
              id="confirmPassword"
              className={errors.confirmPassword ? 'error-input' : ''}
              aria-label="Confirm password"
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              {...register('confirmPassword', {
                required: "Please confirm your password",
                validate: (value) => value === watch('password') || "The confirmPassword and password fields must match."
              })} 
            />
            {errors.confirmPassword && (
              <div id="confirmPassword-error" className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }} role="alert">
                <i className="fa-solid fa-exclamation-circle me-1" aria-hidden="true"></i>
                <span>{errors.confirmPassword.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Links Section */}
        <div className='d-flex flex-row justify-content-between align-items-center gap-3 mt-1'>
          <Link 
            to="/login" 
            className="text-decoration-none fw-medium login-link"
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
            <i className="fa-solid fa-sign-in-alt me-2"></i>
            <span><strong>Already have an account? Log In</strong></span>
          </Link>
        </div>

        {/* Submit Button */}
        <div className="mt-1">
          <Button 
            type='submit' 
            title={isLoading ? 'Creating Account...' : 'Register'} 
            isLoading={isLoading}
            aria-label={isLoading ? 'Creating account, please wait' : 'Create your account'}
          />
        </div>
      </form>
    </AuthForm>
  )
}
