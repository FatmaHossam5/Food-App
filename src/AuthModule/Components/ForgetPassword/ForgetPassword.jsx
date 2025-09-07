import React, { useState } from 'react'
import AuthForm from '../../../Components/SharedUI/AuthForm/AuthForm'
import Input from '../../../Components/SharedUI/Input'
import Button from '../../../Components/SharedUI/Button'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

export default function ForgetPassword() {
      const [isLoading, setIsLoading] = useState(false)
      const [isSuccess, setIsSuccess] = useState(false)
      const [error, setError] = useState('')
      const {handleSubmit, register, formState: {errors}} = useForm({
        mode: 'onChange'
      });
      const navigate = useNavigate()
      
      const onSubmit = async (data) => {
        setIsLoading(true)
        setError('')
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000))
          console.log(data)
          setIsSuccess(true)
          
          // Navigate after showing success message
          setTimeout(() => {
            navigate('/ResetPassword')
          }, 2000)
        } catch (err) {
          setError('Failed to send reset link. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }
  
  return (
    <AuthForm
      title="Forgot Your Password?"
      paragraph="No worries! Please enter your email and we will send a password reset link"
    >
      {isSuccess ? (
        <div className="text-center py-4">
          <div className="mb-3">
            <i className="fa-solid fa-check-circle text-success" style={{ fontSize: '3rem' }}></i>
          </div>
          <h4 className="text-success mb-2">Email Sent!</h4>
          <p className="text-muted mb-3">
            We've sent a password reset link to your email address. 
            Please check your inbox and follow the instructions.
          </p>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Redirecting...</span>
          </div>
          <p className="text-muted mt-2 small">Redirecting to reset page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column" role="form" aria-label="Forgot password form">
          {/* Email Input */}
          <div className="form-field">
            <label htmlFor="email" className="form-label fw-semibold mb-2" style={{ color: '#2c3e50', fontSize: '14px' }}>
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
                required: 'Email address is required',
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

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger d-flex align-items-center mt-2" role="alert">
              <i className="fa-solid fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {/* Links Section */}
          <div className='d-flex flex-row justify-content-between align-items-center gap-3 mt-1'>
            <Link 
              to="/login" 
              className="text-decoration-none fw-medium back-to-login-link"
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
              <i className="fa-solid fa-arrow-left me-2"></i>
              <span>Back to Login</span>
            </Link>
          </div>

          {/* Submit Button */}
          <div className="mt-1">
            <Button 
              type='submit' 
              title={isLoading ? 'Sending Reset Link...' : 'Send Reset Link'} 
              isLoading={isLoading}
              aria-label={isLoading ? 'Sending reset link, please wait' : 'Send password reset link'}
            />
          </div>
        </form>
      )}
    </AuthForm>
  )
}
