import React, { useState } from 'react'
import avatar from '../../../assets/imgs/avatar.png'
import './Navbar.css'

export default function Navbar({ adminData, onMenuToggle, isMobile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchValue)
  }

  return (
    <nav className="enhanced-navbar" role="navigation" aria-label="Main navigation">
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button 
          className="mobile-menu-btn"
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      )}

      {/* Navbar Content */}
      <div 
        className={`navbar-content ${isMenuOpen ? 'show' : ''}`} 
        id="navbarContent"
      >
        <div className="navbar-inner">
          {/* Mobile Spacer for Hamburger Button */}
          {isMobile && <div className="mobile-spacer"></div>}
          
          {/* Search Section */}
          <div className="search-section">
            <form onSubmit={handleSearchSubmit} className="search-form" role="search">
              <div className="search-input-container">
                <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search here..." 
                  value={searchValue}
                  onChange={handleSearchChange}
                  aria-label="Search"
                />
                {searchValue && (
                  <button 
                    type="button" 
                    className="clear-search-btn"
                    onClick={() => setSearchValue('')}
                    aria-label="Clear search"
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* User Section */}
          <div className="user-section">
            {/* Notifications */}
            <button 
              className="notification-btn"
              aria-label="View notifications"
              title="Notifications"
            >
              <i className="fa-solid fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>

            {/* User Profile */}
            <div className="user-profile-container">
              <button 
                className="user-profile-btn"
                onClick={toggleUserMenu}
                aria-expanded={showUserMenu}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <img 
                  src={avatar} 
                  alt={`${adminData?.userName || 'User'} profile`}
                  className="user-avatar"
                />
                <span className="user-name">{adminData?.userName || 'User'}</span>
                <i className={`fa-solid fa-chevron-down chevron ${showUserMenu ? 'rotated' : ''}`}></i>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="user-dropdown" role="menu">
                  <a href="#" className="dropdown-item" role="menuitem">
                    <i className="fa-solid fa-user"></i>
                    Profile
                  </a>
                  <a href="#" className="dropdown-item" role="menuitem">
                    <i className="fa-solid fa-cog"></i>
                    Settings
                  </a>
                  <a href="#" className="dropdown-item" role="menuitem">
                    <i className="fa-solid fa-sign-out-alt"></i>
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}