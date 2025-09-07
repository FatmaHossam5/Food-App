import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import DataNo from '../../../assets/imgs/DataNo.svg'
import avatar from '../../../assets/imgs/avatar.png'
import { ToastContainer, toast } from 'react-toastify';
import EnhancedTable from '../../../Components/SharedUI/EnhancedTable/EnhancedTable';
import Pagination from '../../../Components/SharedUI/Pagination/Pagination';
import './UserList.css';



export default function UserList() {
const[UserList,setUserList]=useState([])
const [pagesArray,setPagesArray]=useState([])
const[searchInput,setSearchInput]=useState('')
const[searchRole,setSearchRole]=useState('')
const[modalState,setModalState]=useState("close");
const[itemId,setItemId]=useState(0)
const[selectedUser,setSelectedUser]=useState(null)
const[loading,setLoading]=useState(false)
const[deleteLoading,setDeleteLoading]=useState(false)
const[currentPage,setCurrentPage]=useState(1)
const[totalPages,setTotalPages]=useState(0)
const[sortConfig,setSortConfig]=useState({key: null, direction: 'asc'})
const[pageSize,setPageSize]=useState(10)



const showViewModal = (user) => {
  setSelectedUser(user);
  setModalState("view-user");
}

const handleClose = () => {
  setModalState("close");
  setSelectedUser(null);
};


const getUsersList = async (pageNo = 1, userName = '', groups = '') => {
  setLoading(true);
  
  // Check if this is a demo account
  const token = localStorage.getItem("adminToken");
  if (token && token.includes('demo-signature')) {
    // Use mock data for demo account
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          userName: "John Doe",
          email: "john.doe@example.com",
          phoneNumber: "+1-555-0123",
          imagePath: null,
          group: { name: "Admin" }
        },
        {
          id: 2,
          userName: "Jane Smith",
          email: "jane.smith@example.com",
          phoneNumber: "+1-555-0124",
          imagePath: null,
          group: { name: "User" }
        },
        {
          id: 3,
          userName: "Mike Johnson",
          email: "mike.johnson@example.com",
          phoneNumber: "+1-555-0125",
          imagePath: null,
          group: { name: "User" }
        },
        {
          id: 4,
          userName: "Sarah Wilson",
          email: "sarah.wilson@example.com",
          phoneNumber: "+1-555-0126",
          imagePath: null,
          group: { name: "Admin" }
        },
        {
          id: 5,
          userName: "David Brown",
          email: "david.brown@example.com",
          phoneNumber: "+1-555-0127",
          imagePath: null,
          group: { name: "User" }
        },
        {
          id: 6,
          userName: "Emily Davis",
          email: "emily.davis@example.com",
          phoneNumber: "+1-555-0128",
          imagePath: null,
          group: { name: "User" }
        },
        {
          id: 7,
          userName: "Chris Miller",
          email: "chris.miller@example.com",
          phoneNumber: "+1-555-0129",
          imagePath: null,
          group: { name: "Admin" }
        },
        {
          id: 8,
          userName: "Lisa Garcia",
          email: "lisa.garcia@example.com",
          phoneNumber: "+1-555-0130",
          imagePath: null,
          group: { name: "User" }
        }
      ];

      // Filter users based on search criteria
      let filteredUsers = mockUsers;
      
      if (userName) {
        filteredUsers = filteredUsers.filter(user => 
          user.userName.toLowerCase().includes(userName.toLowerCase())
        );
      }
      
      if (groups) {
        const roleName = groups === '1' ? 'Admin' : 'User';
        filteredUsers = filteredUsers.filter(user => user.group.name === roleName);
      }

      // Simulate pagination
      const startIndex = (pageNo - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
      const totalPages = Math.ceil(filteredUsers.length / pageSize);

      setUserList(paginatedUsers);
      setPagesArray(Array(totalPages).fill().map((_, i) => i + 1));
      setCurrentPage(pageNo);
      setTotalPages(totalPages);
        setLoading(false);
    }, 800); // Simulate API delay
    return;
  }

  // Regular API call for non-demo accounts
  try {
    const response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Users/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      params: {
        pageSize: pageSize,
        pageNumber: pageNo,
        userName,
        groups
      }
    });
    
    console.log(response?.data?.data);
    setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
    setUserList(response?.data?.data);
    setCurrentPage(pageNo);
    setTotalPages(response.data.totalNumberOfPages);
    
  } catch (error) {
    console.log(error);
    toast.error('Failed to load users. Please try again.');
  } finally {
    setLoading(false);
  }
}
const getNameValue = (select) => {
  setSearchInput(select.target.value);
  getUsersList(1, select.target.value, searchRole);
}

const getRoleValue = (select) => {
  setSearchRole(select.target.value);
  getUsersList(1, searchInput, select.target.value);
}

const clearFilters = () => {
  setSearchInput('');
  setSearchRole('');
  getUsersList(1, '', '');
}



// Handle sorting
const handleSort = (key, direction) => {
  setSortConfig({ key, direction });
  // In a real app, you might want to sort on the server side
  // For now, we'll sort locally
}


// Handle page size change
const handlePageSizeChange = (newPageSize) => {
  setPageSize(newPageSize);
  setCurrentPage(1);
  getUsersList(1, searchInput, searchRole);
}



useEffect(()=>{
  getUsersList(1)
},[])
  // Define table columns
  const columns = [
    {
      key: 'userName',
      title: 'Username',
      sortable: true,
      render: (value, row) => (
        <div className="user-info">
          <strong>{value}</strong>
        </div>
      )
    },
    {
      key: 'imagePath',
      title: 'Avatar',
      sortable: false,
      width: '80px',
      render: (value, row) => (
        <div className="user-avatar-container">
          <img
            className="user-avatar"
            src={value ? `https://upskilling-egypt.com/${value}` : avatar}
            alt={`${row.userName}'s avatar`}
            onError={(e) => {
              e.target.src = avatar;
            }}
          />
        </div>
      )
    },
    {
      key: 'group',
      title: 'Role',
      sortable: true,
      render: (value) => (
        <span className={`role-badge ${value.name.toLowerCase()}`}>
          {value.name}
        </span>
      )
    },
    {
      key: 'phoneNumber',
      title: 'Phone',
      sortable: true,
      render: (value) => (
        <div className="contact-info">
          <i className="fa-solid fa-phone me-2"></i>
          {value || 'N/A'}
        </div>
      )
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
      render: (value) => (
        <div className="email-info">
          <i className="fa-solid fa-envelope me-2"></i>
          {value}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      sortable: false,
      width: '60px',
      render: (value, row) => (
        <div className="action-buttons">
          <button
            className="action-btn view-btn"
            onClick={(e) => {
              e.stopPropagation();
              showViewModal(row);
            }}
            aria-label={`View user ${row.userName}`}
            title="View User Details"
          >
            <i className="fa-solid fa-eye"></i>
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <ToastContainer />
      
      {/* Enhanced Header */}
      <div className="user-list-header">
        <div className="container">
          <h1 className="user-list-title">Users Management</h1>
          <p className="user-list-subtitle">
            Manage and monitor all users in your system. View, search, and manage user accounts with ease.
          </p>
        </div>
      </div>

      <div className="container user-list-container">
        {/* Enhanced Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-filter-header">
            <h3 className="search-filter-title">
              <i className="fa-solid fa-search me-2"></i>
              Search & Filter Users
            </h3>
            <div className="search-stats">
              <span className="search-results-count">
                <i className="fa-solid fa-users me-1"></i>
                {UserList.length} users found
              </span>
            </div>
          </div>
          
          <div className="search-inputs-container">
          <div className="search-inputs-row">
              <div className="search-input-group search-input-primary">
                <label htmlFor="userNameSearch">
                  <i className="fa-solid fa-user me-1"></i>
                  Search by Username
                </label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-search input-icon"></i>
              <input
                id="userNameSearch"
                type="text"
                className="enhanced-search-input"
                    placeholder="Type username to search..."
                value={searchInput}
                onChange={getNameValue}
                aria-label="Search users by username"
              />
                  {searchInput && (
                    <button
                      className="clear-input-btn"
                      onClick={() => {
                        setSearchInput('');
                        getUsersList(1, '', searchRole);
                      }}
                      aria-label="Clear search"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  )}
                </div>
            </div>
              
            <div className="search-input-group">
                <label htmlFor="roleFilter">
                  <i className="fa-solid fa-shield me-1"></i>
                  Filter by Role
                </label>
                <div className="select-with-icon">
                  <i className="fa-solid fa-filter input-icon"></i>
              <select
                id="roleFilter"
                className="enhanced-select"
                value={searchRole}
                onChange={getRoleValue}
                aria-label="Filter users by role"
              >
                <option value="">All Roles</option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </div>
              </div>
              
              <div className="search-actions">
              <button
                  className="btn btn-outline-secondary btn-enhanced clear-filters-btn"
                onClick={clearFilters}
                disabled={!searchInput && !searchRole}
                aria-label="Clear all filters"
              >
                  <i className="fa-solid fa-eraser me-2"></i>
                  Clear All
                </button>
                
                <button
                  className="btn btn-primary btn-enhanced search-btn"
                  onClick={() => getUsersList(1, searchInput, searchRole)}
                  disabled={loading}
                  aria-label="Apply search and filters"
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-search me-2"></i>
                      Search
                    </>
                  )}
              </button>
              </div>
            </div>
            
            {/* Active Filters Display */}
            {(searchInput || searchRole) && (
              <div className="active-filters">
                <span className="active-filters-label">
                  <i className="fa-solid fa-filter me-1"></i>
                  Active Filters:
                </span>
                <div className="filter-tags">
                  {searchInput && (
                    <span className="filter-tag">
                      <i className="fa-solid fa-user me-1"></i>
                      Username: "{searchInput}"
                      <button
                        className="filter-tag-remove"
                        onClick={() => {
                          setSearchInput('');
                          getUsersList(1, '', searchRole);
                        }}
                        aria-label="Remove username filter"
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </span>
                  )}
                  {searchRole && (
                    <span className="filter-tag">
                      <i className="fa-solid fa-shield me-1"></i>
                      Role: {searchRole === '1' ? 'Admin' : 'User'}
                      <button
                        className="filter-tag-remove"
                        onClick={() => {
                          setSearchRole('');
                          getUsersList(1, searchInput, '');
                        }}
                        aria-label="Remove role filter"
                      >
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Table Section */}
        <div className="table-section">
          <div className="table-header">
            <div className="table-header-main">
              <div className="table-title-section">
                <h3 className="table-title">
                  <i className="fa-solid fa-users me-2"></i>
                  Users List
                </h3>
                <div className="table-stats">
                  <div className="stat-item">
                    <i className="fa-solid fa-users stat-icon"></i>
                    <span className="stat-value">{UserList.length}</span>
                    <span className="stat-label">Users</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <i className="fa-solid fa-file-alt stat-icon"></i>
                    <span className="stat-value">{currentPage}</span>
                    <span className="stat-label">of {totalPages}</span>
                  </div>
                </div>
              </div>
              
              <div className="table-actions">
                <button
                  className="table-action-btn refresh-btn"
                  onClick={() => getUsersList(currentPage, searchInput, searchRole)}
                  disabled={loading}
                  title="Refresh data"
                >
                  <i className={`fa-solid fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
                </button>
                
              </div>
            </div>
            
            <div className="table-subtitle-section">
              <div className="table-info">
                <div className="info-item">
                  <i className="fa-solid fa-info-circle me-1"></i>
                  <span>
                    {searchInput || searchRole 
                      ? `Filtered results from search criteria`
                      : `All users in the system`
                    }
                  </span>
                </div>
                {UserList.length > 0 && (
                  <div className="info-item">
                    <i className="fa-solid fa-clock me-1"></i>
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
              
              <div className="table-help">
                <button
                  className="help-btn"
                  onClick={() => {
                    // Add help functionality
                    console.log('Show help');
                  }}
                  title="Table help and tips"
                >
                  <i className="fa-solid fa-question-circle"></i>
                  <span>Help</span>
                </button>
              </div>
            </div>
          </div>

          <EnhancedTable
            data={UserList}
            columns={columns}
            loading={loading}
            selectable={false}
            sortable={true}
          
            onSort={handleSort}
            emptyStateMessage={
              searchInput || searchRole 
                ? "No users match your current search criteria. Try adjusting your filters."
                : "There are no users in the system yet."
            }
            emptyStateIcon="👥"
            showRowNumbers={true}
            hoverable={true}
            striped={true}
          />
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => getUsersList(page, searchInput, searchRole)}
            showFirstLast={true}
            showPrevNext={true}
            maxVisiblePages={5}
            disabled={loading}
          />
        )}
      </div>

      {/* Enhanced View Modal */}
      <Modal show={modalState === 'view-user'} onHide={handleClose} className="enhanced-modal view-modal" size="lg">
        <Modal.Header closeButton className="view-modal-header">
          <Modal.Title>
            <i className="fa-solid fa-user me-2"></i>
            User Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="view-modal-body">
          {selectedUser && (
            <div className="user-details-container">
              {/* User Profile Section */}
              <div className="user-profile-section">
                <div className="user-avatar-large">
                  <img
                    src={selectedUser.imagePath ? `https://upskilling-egypt.com/${selectedUser.imagePath}` : avatar}
                    alt={`${selectedUser.userName}'s avatar`}
                    onError={(e) => {
                      e.target.src = avatar;
                    }}
                  />
                </div>
                <div className="user-basic-info">
                  <h3 className="user-name">{selectedUser.userName}</h3>
                  <div className="user-role-badge">
                    <span className={`role-badge ${selectedUser.group?.name?.toLowerCase()}`}>
                      <i className="fa-solid fa-shield me-1"></i>
                      {selectedUser.group?.name || 'No Role'}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Information Grid */}
              <div className="user-info-grid">
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h4 className="info-label">Email Address</h4>
                    <p className="info-value">{selectedUser.email || 'Not provided'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="info-content">
                    <h4 className="info-label">Phone Number</h4>
                    <p className="info-value">{selectedUser.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="fa-solid fa-id-card"></i>
                  </div>
                  <div className="info-content">
                    <h4 className="info-label">User ID</h4>
                    <p className="info-value">{selectedUser.id || 'N/A'}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="fa-solid fa-calendar"></i>
                  </div>
                  <div className="info-content">
                    <h4 className="info-label">Account Status</h4>
                    <p className="info-value">
                      <span className="status-badge active">
                        <i className="fa-solid fa-check-circle me-1"></i>
                        Active
                      </span>
            </p>
          </div>
                </div>
              </div>

            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="view-modal-footer">
          <button
            className="btn btn-primary-enhanced btn-enhanced"
            onClick={handleClose}
          >
            <i className="fa-solid fa-check me-2"></i>
            Close
          </button>
        </Modal.Footer>
      </Modal>

   
    </>
  )
}
