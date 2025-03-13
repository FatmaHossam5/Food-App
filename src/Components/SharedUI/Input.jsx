import React from 'react'

export default function Input({ placeholder, type = 'text', Icon,className }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const ToggleShowPassword=()=>{
    setShowPassword(!showPassword)
  } 
  return (
    <div className={`shared-input d-flex align-items-center  rounded px-3  bg-light w-100 position-relative ${className}`}>
      {Icon && <i className={`${Icon} text-secondary`} style={{ color: '#8391A1' }} />}
      <div className="border-start mx-3" style={{ height: '24px' }}></div>
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        className='w-100 py-2 flex-grow-1 bg-transparent border-0'
        placeholder={placeholder}
      />
      {type === 'password' && (
        <i
          className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-secondary`}
          style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%',
            transform: 'translateY(-50%)' }}
          onClick={ToggleShowPassword}
        />
      )}
    </div>
  )
}
