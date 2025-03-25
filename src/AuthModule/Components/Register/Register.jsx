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
    <div>

      <AuthForm
        title='Register'
        paragraph='Welcome Back! Please enter your details'  >
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className='form-group d-flex justify-content-between gap-5 my-4'>
            <div className='w-100 input-container'>
              <Input
                type='text'
                placeholder='UserName'
                Icon='fa-light fa-user'
                error={errors.userName}
                {...register('userName', {
                  required: "User name is required",
                  maxLength: { value: 8, message: "The userName may not be greater than 8 characters." },
                  pattern: {
                    value: /^[A-Za-z]+[0-9]+$/,
                    message: "The userName must contain characters and end with numbers without spaces."
                  },

                })}
                className={errors.userName ? 'error-input' : ''}
              />
              {errors.userName && (<p className="error-message">
                <i className="fa fa-exclamation-circle error-icon" />
                {errors.userName.message}
              </p>)}
            </div>


            <div className='w-100 input-container'>
              <Input
                type='email'
                placeholder='Enter your E-mail'
                Icon='fa-light fa-envelope'
                {...register('email', {
                  required: "Email is required",

                })}
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && (<p className="error-message">
                <i className="fa fa-exclamation-circle error-icon" />
                {errors.email.message}
              </p>)}
            </div>

          </div>
          <div className='form-group d-flex justify-content-between gap-5 my-4'>
            <div className='w-100 input-container'>
              <Input
                type='text'
                placeholder='Country'
                Icon='fa-light fa-earth-oceania'
                error={errors.country}
                {...register('country', { required: "Country is required" })} />
              {errors.country && (
                <p className="error-message">
                  <i className="fa fa-exclamation-circle error-icon" />
                  {errors.country.message}
                </p>)}

            </div>
            <div className='w-100 input-container'>
              <Input
                type='text'
                placeholder='Phone Number'
                Icon='fa-light fa-mobile'
                error={errors.phoneNumber}
                {...register('phoneNumber', { required: "Phone number is required" })} />
              {errors.phoneNumber && (
                <p className="error-message">
                  <i className="fa fa-exclamation-circle error-icon" />
                  {errors.phoneNumber.message}
                </p>)}
            </div>

          </div>
          <div className='form-group d-flex justify-content-between gap-5 my-2'>
            <div className='w-100 input-container'>
              <Input
                type='password'
                placeholder='Password'
                Icon='fa-light fa-lock'
                error={errors.password}
                {...register('password', {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
                  }
                })} />
              {errors.password && (
                <p className="error-message">
                  <i className="fa fa-exclamation-circle error-icon" />
                  {errors.password.message}
                </p>)}
            </div>

            <div className='w-100 input-container'>
              <Input
                type='password'
                placeholder='confirm-password'
                Icon='fa-light fa-lock'
                error={errors.confirmPassword}
                {...register('confirmPassword', {
                  required: "Please confirm your password",
                  validate: (value) => value === watch('password') || "The confirmPassword and password fields must match."
                })} />
              {errors.confirmPassword && (<p className="error-message">
                <i className="fa fa-exclamation-circle error-icon" />
                {errors.confirmPassword.message}
              </p>)}
            </div>


          </div>
          <div className='d-flex justify-content-end mt-2'>
            <Link to='/login' className=' text-decoration-none' style={{
              color: '#4AA35A', fontSize: '16px',
              fontWeight: '500'
            }}>
              Log In ?
            </Link>
          </div>
          <Button type='submit' title='Register' isLoading={isLoading} />
        </form>
      </AuthForm>
    </div>
  )
}
