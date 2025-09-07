import React, { useState } from 'react'

export default function Button({type='submit', title, isLoading, className='', disabled=false, 'aria-label': ariaLabel}) {
    
  return (
    <div className='my-3'>
      <button 
        type={type} 
        className={`btn btn-success w-100 enhanced-btn ${className}`} 
        disabled={isLoading || disabled}
        aria-label={ariaLabel || title}
        style={{ 
          backgroundColor: '#4AA35A', 
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(74, 163, 90, 0.2)',
          minHeight: '48px'
        }}
        onMouseEnter={(e) => {
          if (!isLoading && !disabled) {
            e.target.style.backgroundColor = '#3d8a4a';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 8px rgba(74, 163, 90, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading && !disabled) {
            e.target.style.backgroundColor = '#4AA35A';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 4px rgba(74, 163, 90, 0.2)';
          }
        }}
        onMouseDown={(e) => {
          if (!isLoading && !disabled) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 1px 2px rgba(74, 163, 90, 0.2)';
          }
        }}
      >
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center">
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span>Signing In...</span>
          </div>
        ) : (
          <span>{title}</span>
        )}
      </button>
    </div>
  )
}
