import React, { useState } from 'react'

export default function Button({type='submit',title,isLoading}) {
    
  return (
    <div className='my-3'>
          <button type={type} className="btn btn-success w-100" disabled={isLoading} style={{ backgroundColor: '#4AA35A', color: 'white' }}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
           title
            )}
          </button>
        </div>
  )
}
