import React from 'react'
import logo from '../../../assets/imgs/logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthForm from '../../../Components/SharedUI/AuthForm/AuthForm'
import Input from '../../../Components/SharedUI/Input'
import './ResetPassword.css'
import "../../../Components/SharedUI/AuthForm/AuthForm.css"
export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'onChange'
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  const navigate = useNavigate()
  const password = watch('password');

  // Password strength calculation
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', className: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const strengthMap = {
      0: { label: '', className: '' },
      1: { label: 'Very Weak', className: 'password-strength-weak' },
      2: { label: 'Weak', className: 'password-strength-weak' },
      3: { label: 'Medium', className: 'password-strength-medium' },
      4: { label: 'Strong', className: 'password-strength-strong' },
      5: { label: 'Very Strong', className: 'password-strength-very-strong' }
    };
    
    return { strength: (strength / 5) * 100, ...strengthMap[strength] };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');
    
    try {
      await axios.post('https://upskilling-egypt.com:443/api/v1/Users/Reset', data);
      toast.success("Password reset successfully! Please login with your new password.");
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (<>
    <AuthForm title='Reset Password' paragraph='Please enter your email, OTP code, and new password to reset your account.'>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
        {/* Error Display */}
        {submitError && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="fa-solid fa-exclamation-triangle me-2"></i>
            <span>{submitError}</span>
          </div>
        )}

        <div className='form-group d-flex flex-column'>
          {/* Email Field */}
          <div className="form-field">
            <label htmlFor="email" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
              Email Address <span className="text-danger">*</span>
            </label>
            <Input 
              type='email' 
              placeholder='Enter your email address' 
              Icon='fa-solid fa-envelope' 
              className='py-2'
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
            />
            {errors.email && (
              <div className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }}>
                <i className="fa-solid fa-exclamation-circle me-1"></i>
                {errors.email.message}
              </div>
            )}
          </div>

          {/* OTP Field */}
          <div className="form-field">
            <label htmlFor="otp" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
              OTP Code <span className="text-danger">*</span>
            </label>
            <Input 
              type='text' 
              placeholder='Enter 6-digit OTP code' 
              Icon='fa-solid fa-hashtag' 
              className='py-2'
              id="otp"
              maxLength="6"
              {...register('otp', {
                required: 'OTP code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'OTP must be 6 digits'
                }
              })}
            />
            {errors.otp && (
              <div className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }}>
                <i className="fa-solid fa-exclamation-circle me-1"></i>
                {errors.otp.message}
              </div>
            )}
            <small className="text-muted mt-1 d-block" style={{ fontSize: '12px' }}>
              <i className="fa-solid fa-info-circle me-1"></i>
              Check your email for the OTP code
            </small>
          </div>

          {/* New Password Field */}
          <div className="form-field">
            <label htmlFor="password" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
              New Password <span className="text-danger">*</span>
            </label>
            <Input 
              type='password' 
              placeholder='Enter your new password' 
              Icon='fa-solid fa-lock' 
              className='py-2'
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain uppercase, lowercase, and number'
                }
              })}
            />
            {errors.password && (
              <div className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }}>
                <i className="fa-solid fa-exclamation-circle me-1"></i>
                {errors.password.message}
              </div>
            )}
            <small className="text-muted mt-1 d-block" style={{ fontSize: '12px' }}>
              <i className="fa-solid fa-shield-halved me-1"></i>
              Must be at least 8 characters with uppercase, lowercase, and number
            </small>
            {password && (
              <div className="mt-1">
                <div className="password-strength">
                  <div 
                    className={`password-strength-bar ${passwordStrength.className}`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  ></div>
                </div>
                {passwordStrength.label && (
                  <small className={`mt-1 d-block fw-semibold ${
                    passwordStrength.strength < 40 ? 'text-danger' : 
                    passwordStrength.strength < 80 ? 'text-warning' : 'text-success'
                  }`} style={{ fontSize: '11px' }}>
                    Password Strength: {passwordStrength.label}
                  </small>
                )}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-field">
            <label htmlFor="confirmPassword" className="form-label fw-semibold mb-1" style={{ color: '#2c3e50', fontSize: '14px' }}>
              Confirm New Password <span className="text-danger">*</span>
            </label>
            <Input 
              type='password' 
              placeholder='Confirm your new password' 
              Icon='fa-solid fa-lock' 
              className='py-2'
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && (
              <div className="text-danger mt-1 d-flex align-items-center" style={{ fontSize: '13px' }}>
                <i className="fa-solid fa-exclamation-circle me-1"></i>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className='form-group'>
          <button 
            type="submit" 
            className="btn btn-submit w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Resetting Password...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-key"></i>
                <span>Reset Password</span>
              </>
            )}
          </button>
        </div>

        {/* Back to Login Link */}
        <div className="text-center">
          <small className="text-muted">
            Remember your password? 
            <button 
              type="button"
              className="btn btn-link p-0 ms-1 text-decoration-none fw-semibold" 
              style={{ color: '#4AA35A' }}
              onClick={() => navigate('/login')}
            >
              Sign in here
            </button>
          </small>
        </div>
      </form>
    </AuthForm>
  </>)
}
