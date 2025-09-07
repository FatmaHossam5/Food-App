import React, { useContext, useState, useEffect } from 'react'
import logo from '../../../assets/imgs/logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ChangePassword({ handleClose }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
 
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  // Watch password fields for validation
  const newPassword = watch("newPassword")
  const confirmPassword = watch("confirmNewPassword")
  const oldPassword = watch("oldPassword")

  // Handle body scroll locking when modal opens/closes
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    if (strength <= 2) return { strength, label: 'Weak', color: '#dc3545' }
    if (strength <= 3) return { strength, label: 'Fair', color: '#ffc107' }
    if (strength <= 4) return { strength, label: 'Good', color: '#17a2b8' }
    return { strength, label: 'Strong', color: '#28a745' }
  }

  const onSubmit = (data) => {
    setIsLoading(true)
    axios.put(`https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword`, data,
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
    ).then((response) => {
        toast.success('Password changed successfully!');

      navigate('/Login')
      handleClose()
    }).catch((error) => {
      toast.error(error?.response?.data?.message || "Failed to change password. Please try again.");
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const passwordStrength = getPasswordStrength(newPassword)

  return (
    <div className="change-password-modal">
      {/* Modern Modal Backdrop */}
      <div className="modal-backdrop-blur"></div>
      
      {/* Modal Content */}
      <div className="modal-content-container">
        <div className="modern-modal-card">
          {/* Close Button */}
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close modal"
            title="Close"
          >
            <i className="fa-solid fa-times"></i>
          </button>

          {/* Header Section */}
          <div className="modal-header-section">
            <div className="text-center mb-4">
              <div className="modal-logo-container">
                <img src={logo} className='modal-logo' alt="Company Logo" />
              </div>
            </div>
            
            {/* Form Section */}
            <form className='modern-form' onSubmit={handleSubmit(onSubmit)}>
              <div className="text-center mb-4">
                <div className="password-change-icon mb-3">
                  <div className="icon-container">
                    <i className="fa-solid fa-key"></i>
                  </div>
                </div>
                <h2 className="modal-title mb-2">Change Password</h2>
                <p className='modal-subtitle mb-0'>Enter your current password and choose a new secure password</p>
              </div>


              {/* Current Password Field */}
              <div className="form-group mb-4">
                <label htmlFor="oldPassword" className="form-label">
                  <i className="fa-solid fa-lock me-2 text-primary"></i>
                  Current Password
                  <span className="text-danger ms-1">*</span>
                </label>
                <div className="input-wrapper">
                  <input 
                    id="oldPassword"
                    className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
                    type={showPasswords.oldPassword ? 'text' : 'password'} 
                    placeholder='Enter your current password'
                    {...register("oldPassword", {
                      required: "Current password is required"
                    })}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => togglePasswordVisibility('oldPassword')}
                    aria-label={showPasswords.oldPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`fa-solid ${showPasswords.oldPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {errors.oldPassword && (
                  <div className="invalid-feedback d-block">
                    <i className="fa-solid fa-exclamation-circle me-1"></i>
                    {errors.oldPassword.message}
                  </div>
                )}
              </div>

              {/* New Password Field */}
              <div className="form-group mb-4">
                <label htmlFor="newPassword" className="form-label">
                  <i className="fa-solid fa-key me-2 text-primary"></i>
                  New Password
                  <span className="text-muted ms-1">(min. 8 characters)</span>
                </label>
                <div className="input-wrapper">
                  <input 
                    id="newPassword"
                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                    type={showPasswords.newPassword ? 'text' : 'password'} 
                    placeholder='Enter your new password'
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                      },
                      validate: value => value !== oldPassword || "New password must be different from current password"
                    })}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => togglePasswordVisibility('newPassword')}
                    aria-label={showPasswords.newPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`fa-solid ${showPasswords.newPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {errors.newPassword && (
                  <div className="invalid-feedback d-block">
                    <i className="fa-solid fa-exclamation-circle me-1"></i>
                    {errors.newPassword.message}
                  </div>
                )}
                
                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="password-strength mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">Password Strength:</small>
                      <small className="fw-medium" style={{ color: passwordStrength.color }}>
                        {passwordStrength.label}
                      </small>
                    </div>
                    <div className="strength-bar">
                      <div 
                        className="strength-fill"
                        style={{ 
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                          backgroundColor: passwordStrength.color
                        }}
                      ></div>
                    </div>
                    <div className="strength-requirements mt-2">
                      <div className="row g-2">
                        <div className="col-6">
                          <small className={`d-flex align-items-center ${newPassword.length >= 8 ? 'text-success' : 'text-muted'}`}>
                            <i className={`fa-solid ${newPassword.length >= 8 ? 'fa-check-circle' : 'fa-circle'} me-2`}></i>
                            8+ characters
                          </small>
                        </div>
                        <div className="col-6">
                          <small className={`d-flex align-items-center ${/[a-z]/.test(newPassword) ? 'text-success' : 'text-muted'}`}>
                            <i className={`fa-solid ${/[a-z]/.test(newPassword) ? 'fa-check-circle' : 'fa-circle'} me-2`}></i>
                            Lowercase
                          </small>
                        </div>
                        <div className="col-6">
                          <small className={`d-flex align-items-center ${/[A-Z]/.test(newPassword) ? 'text-success' : 'text-muted'}`}>
                            <i className={`fa-solid ${/[A-Z]/.test(newPassword) ? 'fa-check-circle' : 'fa-circle'} me-2`}></i>
                            Uppercase
                          </small>
                        </div>
                        <div className="col-6">
                          <small className={`d-flex align-items-center ${/[0-9]/.test(newPassword) ? 'text-success' : 'text-muted'}`}>
                            <i className={`fa-solid ${/[0-9]/.test(newPassword) ? 'fa-check-circle' : 'fa-circle'} me-2`}></i>
                            Number
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div className="form-group mb-4">
                <label htmlFor="confirmNewPassword" className="form-label">
                  <i className="fa-solid fa-lock me-2 text-primary"></i>
                  Confirm New Password
                  <span className="text-danger ms-1">*</span>
                </label>
                <div className="input-wrapper">
                  <input 
                    id="confirmNewPassword"
                    className={`form-control ${errors.confirmNewPassword ? 'is-invalid' : confirmPassword && newPassword === confirmPassword ? 'is-valid' : ''}`}
                    type={showPasswords.confirmPassword ? 'text' : 'password'} 
                    placeholder='Confirm your new password'
                    {...register("confirmNewPassword", {
                      required: "Please confirm your new password",
                      validate: value => value === newPassword || "Passwords do not match"
                    })}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    aria-label={showPasswords.confirmPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`fa-solid ${showPasswords.confirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {errors.confirmNewPassword && (
                  <div className="invalid-feedback d-block">
                    <i className="fa-solid fa-exclamation-circle me-1"></i>
                    {errors.confirmNewPassword.message}
                  </div>
                )}
                {confirmPassword && newPassword === confirmPassword && !errors.confirmNewPassword && (
                  <div className="valid-feedback d-block">
                    <i className="fa-solid fa-check-circle me-1"></i>
                    Passwords match
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="btn modern-submit-btn w-100"
                disabled={isLoading || !oldPassword || !newPassword || !confirmPassword || errors.newPassword || errors.confirmNewPassword}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Changing Password...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-key me-2"></i>
                    Change Password
                  </>
                )}
              </button>
              
              {/* Security Badge */}
              <div className="text-center mt-4">
                <div className="security-badge">
                  <i className="fa-solid fa-shield-halved me-2"></i>
                  <span>Your password is encrypted and secure</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
