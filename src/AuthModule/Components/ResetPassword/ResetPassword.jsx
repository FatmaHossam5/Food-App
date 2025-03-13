import React from 'react'
import logo from '../../../assets/imgs/logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthForm from '../../../Components/SharedUI/AuthForm/AuthForm'
import Input from '../../../Components/SharedUI/Input'

export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate()

  const onSubmit = (data) => {
    axios.post('https://upskilling-egypt.com:443/api/v1/Users/Reset', data).then((response) => {
      toast("Done!")

      navigate('/login')

    }).catch((error) => {
      toast(error.response.data.message);
    })
  }
  return (<>
    <AuthForm title='Reset Password' paragraph='Please Enter Your Otp  or Check Your Inbox'>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
        <div className='form-group d-flex flex-column gap-3'>
          <Input type='email' placeholder='Email' Icon='fa-light fa-envelope' className='py-1' />
          <Input type='text' placeholder='OTP' Icon='fa-light fa-hashtag' className='py-1' />
          <Input type='password' placeholder=' New Password' Icon='fa-light fa-lock' className='py-1' />
          <Input type='password' placeholder=' Confirm New Password' Icon='fa-light fa-lock' className='py-1' />
        </div>
        <div className='form-group my-3 d-flex justify-content-center'>
          <button type="submit" className="btn  w-100 " disabled={isLoading} style={{ backgroundColor: '#4AA35A', color: 'white' }}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>

    </AuthForm>
  </>

  )
}
