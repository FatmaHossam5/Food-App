import React from 'react'
import bg from '../../../assets/imgs/bg.png'
import './Header.css'

export default function Header({ title, paragraph }) {
  return (
    <header className="enhanced-header" role="banner">
      <div className="header-container">
        <div className="header-content">
          <div className="header-text-section">
            <h1 className="header-title">{title}</h1>
            <p className="header-description">{paragraph}</p>
          </div>
          <div className="header-image-section">
            <img 
              className="header-image" 
              src={bg} 
              alt="Decorative background illustration" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
