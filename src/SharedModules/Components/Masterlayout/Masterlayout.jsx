import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import SideBar from '../SideBar/SideBar'
import './Masterlayout.css'

export default function Masterlayout({adminData}){
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarCollapsed(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="master-layout">
      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarCollapsed(true)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar-container ${sidebarCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        <SideBar 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Navigation */}
        <nav className="navbar-container">
          <Navbar 
            adminData={adminData}
            onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            isMobile={isMobile}
          />
        </nav>

        {/* Page Content */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
