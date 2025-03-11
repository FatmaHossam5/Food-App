import React from 'react'

export default function Input({ placeholder, type = 'text', Icon }) {
  return (
    <div className='shared-input d-flex align-items-center  rounded px-3  bg-light w-100'>
      {Icon && <i className={`${Icon} text-secondary`} style={{ color: '#8391A1' }} />}
      <div className="border-start mx-3" style={{ height: '24px' }}></div>
      <input type={type} className='w-100 py-2 flex-grow-1 bg-transparent border-0' placeholder={placeholder} />
    </div>
  )
}
