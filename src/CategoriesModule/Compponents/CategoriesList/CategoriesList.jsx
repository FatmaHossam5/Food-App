import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import axios from 'axios'
import NoData from '../../../SharedModules/Components/NoData/NoData'
import DataNo from '../../../assets/imgs/DataNo.svg'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import EnhancedTable from '../../../Components/SharedUI/EnhancedTable/EnhancedTable';
import Pagination from '../../../Components/SharedUI/Pagination/Pagination';
import './CategoriesList.css';

export default function CategoriesList() {
  const {register,handleSubmit,formState:{errors},setValue, reset}= useForm();
  const[CategoriesList,setCategoriesList]= useState([]);
  const[modalState,setModalState]=useState("close");
  const[itemId,setItemId]=useState(0)
  const[pagesArray,setPagesArray]=useState([])
  const[searchInput,setSearchInput]=useState("")
  const[loading,setLoading]=useState(false)
  const[deleteLoading,setDeleteLoading]=useState(false)
  const[currentPage,setCurrentPage]=useState(1)
  const[totalPages,setTotalPages]=useState(0)
  const[sortConfig,setSortConfig]=useState({key: null, direction: 'asc'})
  const[pageSize,setPageSize]=useState(5)
 
  const getCategoriesList = async (pageNo = 1, name = '') => {
    setLoading(true);
    try {
      const response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        },
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          name
        }
      });
      
      setCategoriesList(response.data.data);
      setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
      setCurrentPage(pageNo);
      setTotalPages(response.data.totalNumberOfPages);
      
    } catch (error) {
      console.log(error);
      toast.error('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  const handleClose = () => {
    setModalState("close");
    reset();
  };

  const showAddModel = () => {
    setModalState("add-category");
    reset();
  }
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("https://upskilling-egypt.com:443/api/v1/Category/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      });
      toast.success('Category added successfully!');
      handleClose();
      getCategoriesList(currentPage, searchInput);
    } catch (error) {
      console.log(error);
      toast.error('Failed to add category. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  const showUpdateCategory = (categoryItem) => {
    setModalState("update-category");
    setItemId(categoryItem.id);
    setValue("name", categoryItem.name);
  }

  const updateCategory = async (data) => {
    setLoading(true);
    try {
      await axios.put(`https://upskilling-egypt.com:443/api/v1/Category/${itemId}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      toast.success('Category updated successfully!');
      handleClose();
      getCategoriesList(currentPage, searchInput);
    } catch (error) {
  console.log(error);
      toast.error('Failed to update category. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const showDeleteCategory = (id) => {
    setModalState("delete-category");
    setItemId(id);
  }

  const deleteCategory = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      toast.success('Category deleted successfully!');
      getCategoriesList(currentPage, searchInput);
  handleClose();
    } catch (error) {
  console.log(error);
      toast.error('Failed to delete category. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  }
  const getNameValue = (input) => {
    setSearchInput(input.target.value);
    getCategoriesList(1, input.target.value);
  }

  const clearFilters = () => {
    setSearchInput('');
    getCategoriesList(1, '');
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
    getCategoriesList(1, searchInput);
  }

  useEffect(() => {
    getCategoriesList(1);
  }, []);

  // Define table columns
  const columns = [
    {
      key: 'name',
      title: 'Category Name',
      sortable: true,
      render: (value, row) => (
        <div className="category-info">
          <strong>{value}</strong>
      </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      sortable: false,
      width: '120px',
      render: (value, row) => (
        <div className="action-buttons">
          <button
            className="action-btn edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              showUpdateCategory(row);
            }}
            aria-label={`Edit category ${row.name}`}
            title="Edit Category"
          >
            <i className="fa-solid fa-edit"></i>
          </button>
          <button
            className="action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              showDeleteCategory(row.id);
            }}
            aria-label={`Delete category ${row.name}`}
            title="Delete Category"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
      </div>
      )
    }
  ];

  return (
    <>
      <ToastContainer />
      
      {/* Original Header */}
      <Header title={'welcome Categories'} paragraph={'categories'}/>

      <div className="container categories-list-container">
        {/* Enhanced Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-filter-header">
            <h3 className="search-filter-title">
              <i className="fa-solid fa-search me-2"></i>
              Search & Filter Categories
            </h3>
            <div className="search-stats">
              <span className="search-results-count">
                <i className="fa-solid fa-tags me-1"></i>
                {CategoriesList.length} categories found
              </span>
            </div>
          </div>
          
          <div className="search-inputs-container">
            <div className="search-inputs-row">
              <div className="search-input-group search-input-primary">
                <label htmlFor="categoryNameSearch">
                  <i className="fa-solid fa-tag me-1"></i>
                  Search by Category Name
                </label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-search input-icon"></i>
                  <input
                    id="categoryNameSearch"
                    type="text"
                    className="enhanced-search-input"
                    placeholder="Type category name to search..."
                    value={searchInput}
                    onChange={getNameValue}
                    aria-label="Search categories by name"
                  />
                  {searchInput && (
                    <button
                      className="clear-input-btn"
                      onClick={() => {
                        setSearchInput('');
                        getCategoriesList(1, '');
                      }}
                      aria-label="Clear search"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="search-actions">
                <button
                  className="btn btn-outline-secondary btn-enhanced clear-filters-btn"
                  onClick={clearFilters}
                  disabled={!searchInput}
                  aria-label="Clear all filters"
                >
                  <i className="fa-solid fa-eraser me-2"></i>
                  Clear All
                </button>
                
                <button
                  className="btn btn-primary btn-enhanced search-btn"
                  onClick={() => getCategoriesList(1, searchInput)}
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
            {searchInput && (
              <div className="active-filters">
                <span className="active-filters-label">
                  <i className="fa-solid fa-filter me-1"></i>
                  Active Filters:
                </span>
                <div className="filter-tags">
                  <span className="filter-tag">
                    <i className="fa-solid fa-tag me-1"></i>
                    Category: "{searchInput}"
                    <button
                      className="filter-tag-remove"
                      onClick={() => {
                        setSearchInput('');
                        getCategoriesList(1, '');
                      }}
                      aria-label="Remove category filter"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </span>
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
                  <i className="fa-solid fa-tags me-2"></i>
                  Categories List
                </h3>
                <div className="table-stats">
                  <div className="stat-item">
                    <i className="fa-solid fa-tags stat-icon"></i>
                    <span className="stat-value">{CategoriesList.length}</span>
                    <span className="stat-label">Categories</span>
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
                  className="btn btn-success btn-enhanced add-category-btn"
                  onClick={showAddModel}
                  disabled={loading}
                  aria-label="Add new category"
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Add New Category
                </button>
                
                <button
                  className="table-action-btn refresh-btn"
                  onClick={() => getCategoriesList(currentPage, searchInput)}
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
                    {searchInput 
                      ? `Filtered results from search criteria`
                      : `All categories in the system`
                    }
                  </span>
                </div>
                {CategoriesList.length > 0 && (
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
            data={CategoriesList}
            columns={columns}
            loading={loading}
            selectable={false}
            sortable={true}
            onSort={handleSort}
            emptyStateMessage={
              searchInput 
                ? "No categories match your current search criteria. Try adjusting your filters."
                : "There are no categories in the system yet."
            }
            emptyStateIcon="🏷️"
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
            onPageChange={(page) => getCategoriesList(page, searchInput)}
            showFirstLast={true}
            showPrevNext={true}
            maxVisiblePages={5}
            disabled={loading}
          />
        )}
      </div>

      {/* Enhanced Add Modal */}
      <Modal show={modalState === 'add-category'} onHide={handleClose} className="enhanced-modal add-modal" size="md">
        <Modal.Header closeButton className="add-modal-header">
          <Modal.Title>
            <i className="fa-solid fa-plus me-2"></i>
            Add New Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="categoryName" className="form-label">
                <i className="fa-solid fa-tag me-1"></i>
                Category Name
              </label>
              <input
                id="categoryName"
                className="form-control enhanced-input"
                placeholder="Enter category name"
                type="text"
                {...register("name", { required: true, minLength: 2 })}
              />
              {errors.name && (
                <div className="error-message">
                  {errors.name.type === 'required' && 'Category name is required'}
                  {errors.name.type === 'minLength' && 'Category name must be at least 2 characters'}
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="add-modal-footer">
          <button
            className="btn btn-secondary-enhanced btn-enhanced"
            onClick={handleClose}
            disabled={loading}
          >
            <i className="fa-solid fa-times me-2"></i>
            Cancel
          </button>
          <button
            className="btn btn-primary-enhanced btn-enhanced"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                Adding...
              </>
            ) : (
              <>
                <i className="fa-solid fa-save me-2"></i>
                Add Category
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Enhanced Update Modal */}
      <Modal show={modalState === 'update-category'} onHide={handleClose} className="enhanced-modal update-modal" size="md">
        <Modal.Header closeButton className="update-modal-header">
          <Modal.Title>
            <i className="fa-solid fa-edit me-2"></i>
            Update Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="update-modal-body">
          <form onSubmit={handleSubmit(updateCategory)}>
            <div className="form-group">
              <label htmlFor="updateCategoryName" className="form-label">
                <i className="fa-solid fa-tag me-1"></i>
                Category Name
              </label>
              <input
                id="updateCategoryName"
                className="form-control enhanced-input"
                placeholder="Enter category name"
                type="text"
                {...register("name", { required: true, minLength: 2 })}
              />
              {errors.name && (
                <div className="error-message">
                  {errors.name.type === 'required' && 'Category name is required'}
                  {errors.name.type === 'minLength' && 'Category name must be at least 2 characters'}
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="update-modal-footer">
          <button
            className="btn btn-secondary-enhanced btn-enhanced"
            onClick={handleClose}
            disabled={loading}
          >
            <i className="fa-solid fa-times me-2"></i>
            Cancel
          </button>
          <button
            className="btn btn-primary-enhanced btn-enhanced"
            onClick={handleSubmit(updateCategory)}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                Updating...
              </>
            ) : (
              <>
                <i className="fa-solid fa-save me-2"></i>
                Update Category
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Enhanced Delete Modal */}
      <Modal show={modalState === 'delete-category'} onHide={handleClose} className="enhanced-modal delete-modal" size="md">
        <Modal.Header closeButton className="delete-modal-header">
          <Modal.Title>
            <i className="fa-solid fa-exclamation-triangle me-2"></i>
            Delete Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="delete-modal-body">
          <div className="delete-container">
            <div className="delete-icon">
              <i className="fa-solid fa-trash-can"></i>
            </div>
            <div className="delete-content">
              <h4 className="delete-title">Are you sure you want to delete this category?</h4>
              <p className="delete-description">
                This action cannot be undone. The category will be permanently removed from the system.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="delete-modal-footer">
          <button
            className="btn btn-secondary-enhanced btn-enhanced"
            onClick={handleClose}
            disabled={deleteLoading}
          >
            <i className="fa-solid fa-times me-2"></i>
            Cancel
          </button>
          <button
            className="btn btn-danger-enhanced btn-enhanced"
            onClick={deleteCategory}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                Deleting...
              </>
            ) : (
              <>
                <i className="fa-solid fa-trash me-2"></i>
                Delete Category
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
