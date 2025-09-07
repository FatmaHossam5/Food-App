import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home({adminData}) {
  return (
    <>
      <Header 
        title={`Welcome ${adminData?.userName}`} 
        paragraph={'This is a welcoming screen for the entry of the application, you can now see the options'}
      />
      
      <div className="home-container">
        <div className="container-fluid">
          {/* Main Action Card */}
          <div className="action-card">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-6">
                <div className="action-content">
                  <div className="action-icon">
                    <i className="fa fa-utensils" aria-hidden="true"></i>
                  </div>
                  <h2 className="action-title">Fill The Recipes!</h2>
                  <p className="action-description">
                    You can now add your items that any user can order from the Application. 
                    Manage your recipes, edit existing ones, and keep your menu fresh and exciting.
                  </p>
                  <div className="action-features">
                    <div className="feature-item">
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                      <span>Add new recipes</span>
                    </div>
                    <div className="feature-item">
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                      <span>Edit existing items</span>
                    </div>
                    <div className="feature-item">
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                      <span>Manage your menu</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="action-button-container">
                  <Link 
                    to="/dashboard/recipes" 
                    className="btn btn-primary action-button"
                    role="button"
                    aria-label="Go to recipes management page"
                  >
                    <span className="button-content">
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      <span>Manage Recipes</span>
                    </span>
                    <i className="fa fa-arrow-right button-arrow" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4">
                <Link to="/dashboard/recipes" className="quick-action-card">
                  <div className="card-icon">
                    <i className="fa fa-utensils" aria-hidden="true"></i>
                  </div>
                  <h4>Recipes</h4>
                  <p>Manage your recipe collection</p>
                  <div className="card-arrow">
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <Link to="/dashboard/categories" className="quick-action-card">
                  <div className="card-icon">
                    <i className="fa fa-tags" aria-hidden="true"></i>
                  </div>
                  <h4>Categories</h4>
                  <p>Organize your menu categories</p>
                  <div className="card-arrow">
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-md-6 mb-4">
                <Link to="/dashboard/users" className="quick-action-card">
                  <div className="card-icon">
                    <i className="fa fa-users" aria-hidden="true"></i>
                  </div>
                  <h4>Users</h4>
                  <p>Manage user accounts</p>
                  <div className="card-arrow">
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
