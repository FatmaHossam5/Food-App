import React from 'react'

export default function Input({placeholder}) {
  return (
    <div className='shared-input'>
     
        <input type="text" className='w-100 py-2'placeholder={placeholder}/>
    </div>
  )
}
