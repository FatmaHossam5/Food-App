import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import Header from '../../../SharedModules/Components/Header/Header';
import NoData from '../../../SharedModules/Components/NoData/NoData';
import avatar from '../../../assets/imgs/avatar.png';
import DataNo from '../../../assets/imgs/DataNo.svg';
import './RecipesList.css';
import {
  useRecipes,
  useTags,
  useCategories,
  useCreateRecipe,
  useUpdateRecipe,
  useDeleteRecipe,
} from '../../../SharedModules/Components/Hooks/useRecipes';

export default function RecipesList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', tagId: '', categoryId: '' });
  const [modalState, setModalState] = useState('close');
  const [currentId, setCurrentId] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors },reset } = useForm();
  const [recipe, setRecipe] = useState()

  // Queries
  const { data: recipeData, isLoading } = useRecipes({ page, filters });
  const { data: tagData } = useTags();
  const { data: catData } = useCategories();
  console.log(recipeData);
console.log(recipe);

  // Mutations
  const createRecipe = useCreateRecipe();
  const updateRecipe = useUpdateRecipe();
  const deleteRecipe = useDeleteRecipe();

  if (isLoading) return <div>Loading...</div>;

  const recipes = recipeData.data;
  const totalPages = recipeData.totalNumberOfPages;

  const openModal = (mode, item) => {

    if (item) {
          setCurrentId(item.id);
        }
    setModalState(mode);
    if (mode === 'update' && item) {

      setRecipe(item);           // ← save the full item so recipe.imagePath exists
      setValue('name', item.name);
      setValue('price', item.price);
      setValue('description', item.description);
      setValue('tagId', item.tag?.id);
      setValue('categoriesIds', item.category[0]?.id);
    }
  };


  const closeModal = () => {
    setModalState('close');
    setRecipe(undefined);        // ← clear out old preview
  };

  const onAdd = data => {
    const formData = new FormData();
    formData.append('name',        data.name);
    formData.append('price',       data.price);
    formData.append('description', data.description);
    formData.append('tagId',       data.tagId);
    formData.append('categoriesIds', data.categoriesIds);
  
    if (data.recipeImage?.length) {
      formData.append('recipeImage', data.recipeImage[0]);
    }
  
    createRecipe.mutate(formData, {
      onSuccess: () => {
        reset();       // clear out the fields (including the file input)
        closeModal();  // hide modal
      },
      onError: err => {
        toast.error(err.response?.data?.message || 'Failed to add recipe');
      }
    });
  };
  const onUpdate = data => {
    const formData = new FormData();
    Object.keys(data).forEach(key =>
      data[key] instanceof FileList
        ? formData.append(key, data[key][0])
        : formData.append(key, data[key])
    );
    updateRecipe.mutate({ id: currentId, formData }, { onSuccess: closeModal });
  };

  const onDelete = () => {
    deleteRecipe.mutate(currentId, {
      onSuccess: () => {
        toast('Deleted!');
        closeModal();
      },
      onError: err => toast(err.response.data.message),
    });
  };

  return (
    <>
      <Header title="Recipe Items" paragraph="You can now add your items that any user can order from the Application and edit them." />

  

      {/* Enhanced Add Modal */}
      <Modal show={modalState === 'add'} onHide={closeModal} className="enhanced-modal add-modal" size="lg" centered>
        <Modal.Header closeButton className="add-modal-header">
          <Modal.Title>
            <i className="fa-solid fa-plus me-2"></i>
            Add New Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-modal-body">
          <form onSubmit={handleSubmit(onAdd)} encType="multipart/form-data">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="addName" className="form-label">
                  <i className="fa-solid fa-utensils me-1"></i>
                  Recipe Name *
                </label>
              <input
                  id="addName"
                {...register('name', { required: true })}
                  className="form-control enhanced-input"
                  placeholder="Enter recipe name"
                type="text"
              />
              {errors.name && <small className="text-danger">Name is required</small>}
            </div>

              <div className="form-group">
                <label htmlFor="addPrice" className="form-label">
                  <i className="fa-solid fa-dollar-sign me-1"></i>
                  Price *
                </label>
              <input
                  id="addPrice"
                {...register('price', { required: true })}
                  className="form-control enhanced-input"
                  placeholder="Enter price"
                type="number"
                  min="0"
                  step="0.01"
              />
              {errors.price && <small className="text-danger">Price is required</small>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="addDescription" className="form-label">
                <i className="fa-solid fa-align-left me-1"></i>
                Description *
              </label>
              <textarea
                id="addDescription"
                {...register('description', { required: true })}
                className="form-control enhanced-textarea"
                placeholder="Enter recipe description"
                rows="3"
              />
              {errors.description && <small className="text-danger">Description is required</small>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="addTag" className="form-label">
                  <i className="fa-solid fa-tags me-1"></i>
                  Tag *
                </label>
                <select 
                  id="addTag"
                  {...register('tagId', { required: true })} 
                  className="form-select enhanced-select"
                >
                <option value="">Select Tag</option>
                {tagData?.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              {errors.tagId && <small className="text-danger">Tag is required</small>}
            </div>

              <div className="form-group">
                <label htmlFor="addCategory" className="form-label">
                  <i className="fa-solid fa-layer-group me-1"></i>
                  Category *
                </label>
                <select 
                  id="addCategory"
                  {...register('categoriesIds', { required: true })} 
                  className="form-select enhanced-select"
                >
                <option value="">Select Category</option>
                {catData?.data?.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.categoriesIds && <small className="text-danger">Category is required</small>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="addImage" className="form-label">
                <i className="fa-solid fa-image me-1"></i>
                Recipe Image *
              </label>
              <input
                id="addImage"
                type="file"
                {...register('recipeImage', { required: true })}
                className="form-control enhanced-file-input"
                accept="image/*"
              />
              <small className="form-text">Upload a high-quality image of your recipe (JPG, PNG, GIF)</small>
              {errors.recipeImage && <small className="text-danger">Please upload a recipe image</small>}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary btn-enhanced"
                onClick={closeModal}
              >
                <i className="fa-solid fa-times me-2"></i>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success btn-enhanced"
                disabled={createRecipe.isPending}
              >
                {createRecipe.isPending ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-save me-2"></i>
                Save Recipe
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Enhanced Update Modal */}
      <Modal
        show={modalState === 'update'}
        onHide={closeModal}
        className="enhanced-modal update-modal"
        size="lg"
        centered
      >
        <Modal.Header closeButton className="update-modal-header">
          <Modal.Title>
            <i className="fa-solid fa-edit me-2"></i>
            Update Recipe
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="update-modal-body">
          <form onSubmit={handleSubmit(onUpdate)} encType="multipart/form-data">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="updateName" className="form-label">
                  <i className="fa-solid fa-utensils me-1"></i>
                  Recipe Name *
                </label>
                <input
                  id="updateName"
                  {...register('name', { required: true })}
                  className="form-control enhanced-input"
                  placeholder="Enter recipe name"
                  type="text"
                />
                {errors.name && <small className="text-danger">Name is required</small>}
              </div>

              <div className="form-group">
                <label htmlFor="updatePrice" className="form-label">
                  <i className="fa-solid fa-dollar-sign me-1"></i>
                  Price *
                </label>
                <input
                  id="updatePrice"
                  {...register('price', { required: true })}
                  className="form-control enhanced-input"
                  placeholder="Enter price"
                  type="number"
                  min="0"
                  step="0.01"
                />
                {errors.price && <small className="text-danger">Price is required</small>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="updateDescription" className="form-label">
                <i className="fa-solid fa-align-left me-1"></i>
                Description *
              </label>
              <textarea
                id="updateDescription"
                {...register('description', { required: true })}
                className="form-control enhanced-textarea"
                placeholder="Enter recipe description"
                rows="3"
              />
              {errors.description && <small className="text-danger">Description is required</small>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="updateTag" className="form-label">
                  <i className="fa-solid fa-tags me-1"></i>
                  Tag *
                </label>
                <select
                  id="updateTag"
                  {...register('tagId', { required: true })}
                  className="form-select enhanced-select"
                >
                  <option value="">Select Tag</option>
                  {tagData?.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                {errors.tagId && <small className="text-danger">Tag is required</small>}
              </div>

              <div className="form-group">
                <label htmlFor="updateCategory" className="form-label">
                  <i className="fa-solid fa-layer-group me-1"></i>
                  Category *
                </label>
                <select
                  id="updateCategory"
                  {...register('categoriesIds', { required: true })}
                  className="form-select enhanced-select"
                >
                  <option value="">Select Category</option>
                  {catData?.data?.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.categoriesIds && <small className="text-danger">Category is required</small>}
              </div>
            </div>

            {/* Current Image Preview */}
            {recipe?.imagePath && (
              <div className="current-image-section">
                <label className="form-label">
                  <i className="fa-solid fa-image me-1"></i>
                  Current Image
                </label>
                <div className="current-image-preview">
                  <img
                    src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                    alt="Current Recipe"
                    className="current-image"
                  />
                </div>
              </div>
            )}

            {/* New Image (optional) */}
            <div className="form-group">
              <label htmlFor="updateRecipeImage" className="form-label">
                <i className="fa-solid fa-image me-1"></i>
                New Recipe Image (optional)
              </label>
              <input
                id="updateRecipeImage"
                type="file"
                accept="image/*"
                {...register('recipeImage')}
                className="form-control enhanced-file-input"
              />
              <small className="form-text">Upload a new image to replace the current one</small>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary btn-enhanced"
                onClick={closeModal}
              >
                <i className="fa-solid fa-times me-2"></i>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-warning btn-enhanced"
                disabled={updateRecipe.isPending}
              >
                {updateRecipe.isPending ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-save me-2"></i>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* Enhanced Delete Modal */}
      <Modal show={modalState === 'delete'} onHide={closeModal} className="enhanced-modal delete-modal" centered>
        <Modal.Header closeButton className="delete-modal-header">
          <Modal.Title>
            <i className="fa-solid fa-exclamation-triangle me-2"></i>
            Delete Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="delete-modal-body">
          <div className="delete-confirmation">
            <div className="delete-icon">
              <i className="fa-solid fa-trash-can"></i>
            </div>
            <h4 className="delete-title">Delete This Recipe?</h4>
            <p className="delete-description">
              Are you sure you want to delete this recipe? This action cannot be undone and will permanently remove the recipe from your system.
            </p>
            
            {recipe && (
              <div className="recipe-preview">
                <div className="recipe-preview-image">
                  {recipe.imagePath ? (
                    <img
                      src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                      alt={recipe.name}
                      className="preview-image"
                    />
                  ) : (
                    <div className="preview-placeholder">
                      {recipe.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="recipe-preview-info">
                  <h5 className="preview-name">{recipe.name}</h5>
                  <p className="preview-price">
                    <i className="fa-solid fa-dollar-sign me-1"></i>
                    {recipe.price}
                  </p>
                  <p className="preview-category">
                    <i className="fa-solid fa-layer-group me-1"></i>
                    {recipe.category[0]?.name || 'No Category'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="delete-modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn-enhanced"
            onClick={closeModal}
          >
            <i className="fa-solid fa-times me-2"></i>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger btn-enhanced"
            onClick={onDelete}
            disabled={deleteRecipe.isPending}
          >
            {deleteRecipe.isPending ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                Deleting...
              </>
            ) : (
              <>
                <i className="fa-solid fa-trash me-2"></i>
                Delete Recipe
              </>
            )}
          </button>
        </Modal.Footer>
      </Modal>

      <div className="container recipes-list-container">
        {/* Enhanced Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-filter-header">
            <h3 className="search-filter-title">
              <i className="fa-solid fa-search me-2"></i>
              Search & Filter Recipes
            </h3>
            <div className="search-stats">
              <span className="search-results-count">
                <i className="fa-solid fa-utensils me-1"></i>
                {recipes.length} recipes found
              </span>
            </div>
        </div>

          <div className="search-inputs-container">
            <div className="search-inputs-row">
              <div className="search-input-group search-input-primary">
                <label htmlFor="recipeNameSearch">
                  <i className="fa-solid fa-utensils me-1"></i>
                  Search by Recipe Name
                </label>
                <div className="input-with-icon">
                  <i className="fa-solid fa-search input-icon"></i>
            <input
                    id="recipeNameSearch"
              type="text"
                    className="enhanced-search-input"
                    placeholder="Type recipe name to search..."
                    value={filters.name}
              onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
                    aria-label="Search recipes by name"
                  />
                  {filters.name && (
                    <button
                      className="clear-input-btn"
                      onClick={() => setFilters(f => ({ ...f, name: '' }))}
                      aria-label="Clear search"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  )}
                </div>
          </div>
              
              <div className="search-input-group">
                <label htmlFor="tagFilter">
                  <i className="fa-solid fa-tags me-1"></i>
                  Filter by Tag
                </label>
                <div className="select-with-icon">
                  <i className="fa-solid fa-filter input-icon"></i>
            <select
                    id="tagFilter"
                    className="enhanced-select"
                    value={filters.tagId}
              onChange={e => setFilters(f => ({ ...f, tagId: e.target.value }))}
                    aria-label="Filter recipes by tag"
            >
                    <option value="">All Tags</option>
              {tagData?.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
              </div>
              
              <div className="search-input-group">
                <label htmlFor="categoryFilter">
                  <i className="fa-solid fa-layer-group me-1"></i>
                  Filter by Category
                </label>
                <div className="select-with-icon">
                  <i className="fa-solid fa-filter input-icon"></i>
            <select
                    id="categoryFilter"
                    className="enhanced-select"
                    value={filters.categoryId}
              onChange={e => setFilters(f => ({ ...f, categoryId: e.target.value }))}
                    aria-label="Filter recipes by category"
            >
                    <option value="">All Categories</option>
              {catData?.data?.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
                </div>
              </div>
            </div>
            
            <div className="search-actions">
              <button
                className="btn btn-outline-secondary btn-enhanced clear-filters-btn"
                onClick={() => setFilters({ name: '', tagId: '', categoryId: '' })}
                disabled={!filters.name && !filters.tagId && !filters.categoryId}
                aria-label="Clear all filters"
              >
                <i className="fa-solid fa-eraser me-2"></i>
                Clear All
              </button>
              
              <button
                className="btn btn-primary btn-enhanced search-btn"
                onClick={() => setPage(1)}
                disabled={isLoading}
                aria-label="Apply search and filters"
              >
                {isLoading ? (
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
          {(filters.name || filters.tagId || filters.categoryId) && (
            <div className="active-filters">
              <span className="active-filters-label">
                <i className="fa-solid fa-filter me-1"></i>
                Active Filters:
              </span>
              <div className="filter-tags">
                {filters.name && (
                  <span className="filter-tag">
                    <i className="fa-solid fa-utensils me-1"></i>
                    Name: "{filters.name}"
                    <button
                      className="filter-tag-remove"
                      onClick={() => setFilters(f => ({ ...f, name: '' }))}
                      aria-label="Remove name filter"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </span>
                )}
                {filters.tagId && (
                  <span className="filter-tag">
                    <i className="fa-solid fa-tags me-1"></i>
                    Tag: {tagData?.find(t => t.id === filters.tagId)?.name}
                    <button
                      className="filter-tag-remove"
                      onClick={() => setFilters(f => ({ ...f, tagId: '' }))}
                      aria-label="Remove tag filter"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </span>
                )}
                {filters.categoryId && (
                  <span className="filter-tag">
                    <i className="fa-solid fa-layer-group me-1"></i>
                    Category: {catData?.data?.find(c => c.id === filters.categoryId)?.name}
                    <button
                      className="filter-tag-remove"
                      onClick={() => setFilters(f => ({ ...f, categoryId: '' }))}
                      aria-label="Remove category filter"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Table Section */}
        <div className="table-section">
          <div className="table-header">
            <div className="table-header-main">
              <div className="table-title-section">
                <h3 className="table-title">
                  <i className="fa-solid fa-utensils me-2"></i>
                  Recipes List
                </h3>
                <div className="table-stats">
                  <div className="stat-item">
                    <i className="fa-solid fa-utensils stat-icon"></i>
                    <span className="stat-value">{recipes.length}</span>
                    <span className="stat-label">Recipes</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <i className="fa-solid fa-file-alt stat-icon"></i>
                    <span className="stat-value">{page}</span>
                    <span className="stat-label">of {totalPages}</span>
                  </div>
                </div>
              </div>
              
              <div className="table-actions">
                <button
                  className="btn btn-success btn-enhanced add-recipe-btn"
                  onClick={() => openModal('add')}
                  disabled={isLoading}
                  aria-label="Add new recipe"
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Add New Recipe
                </button>
                
                <button
                  className="table-action-btn refresh-btn"
                  onClick={() => setPage(page)}
                  disabled={isLoading}
                  title="Refresh data"
                >
                  <i className={`fa-solid fa-sync-alt ${isLoading ? 'fa-spin' : ''}`}></i>
                </button>
              </div>
            </div>
            
            <div className="table-subtitle-section">
              <div className="table-info">
                <div className="info-item">
                  <i className="fa-solid fa-info-circle me-1"></i>
                  <span>
                    {filters.name || filters.tagId || filters.categoryId 
                      ? `Filtered results from search criteria`
                      : `All recipes in the system`
                    }
                  </span>
                </div>
                {recipes.length > 0 && (
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

          {/* Enhanced Table */}
        {recipes.length > 0 ? (
            <div className="table-wrapper">
              <table className="enhanced-table table-striped table-hover">
            <thead>
              <tr>
                    <th className="table-header-cell table-header-cell--number">#</th>
                    <th className="table-header-cell table-header-cell--sortable">
                      <div className="header-content">
                        <span className="header-text">Recipe Name</span>
                        <i className="fa-solid fa-sort sort-icon sort-icon--inactive" />
                      </div>
                    </th>
                    <th className="table-header-cell">Image</th>
                    <th className="table-header-cell">Description</th>
                    <th className="table-header-cell table-header-cell--sortable">
                      <div className="header-content">
                        <span className="header-text">Price</span>
                        <i className="fa-solid fa-sort sort-icon sort-icon--inactive" />
                      </div>
                    </th>
                    <th className="table-header-cell">Tag</th>
                    <th className="table-header-cell">Category</th>
                    <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((item, idx) => (
                    <tr key={item.id} className="table-row">
                      <td className="table-cell table-cell--number">{idx + 1}</td>
                      <td className="table-cell">
                        <div className="recipe-info">
                          <strong>{item.name}</strong>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="recipe-image-container">
                    {item.imagePath ? (
                      <img
                              className="recipe-image"
                        src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                        alt={item.name}
                      />
                    ) : (
                            <div className="recipe-image-placeholder">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="recipe-description">
                          {item.description?.length > 50 
                            ? `${item.description.substring(0, 50)}...` 
                            : item.description
                          }
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="price-info">
                          <i className="fa-solid fa-dollar-sign me-1"></i>
                          {item.price}
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className="tag-badge">
                          {item.tag?.name || 'No Tag'}
                        </span>
                      </td>
                      <td className="table-cell">
                        <span className="category-badge">
                          {item.category[0]?.name || 'No Category'}
                        </span>
                  </td>
                      <td className="table-cell">
                        <div className="action-buttons">
                          <button
                            className="action-btn edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('update', item);
                            }}
                            aria-label={`Edit recipe ${item.name}`}
                            title="Edit Recipe"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('delete', item);
                            }}
                            aria-label={`Delete recipe ${item.name}`}
                            title="Delete Recipe"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          ) : (
            <div className="table-empty-state">
              <div className="empty-state-icon">🍽️</div>
              <h4 className="empty-state-title">No Recipes Found</h4>
              <p className="empty-state-description">
                {filters.name || filters.tagId || filters.categoryId 
                  ? "No recipes match your current search criteria. Try adjusting your filters."
                  : "There are no recipes in the system yet. Add your first recipe to get started!"
                }
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="pagination-section">
            <div className="enhanced-pagination">
              <button
                className="page-link"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const startPage = Math.max(1, page - 2);
                const pageNum = startPage + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    className={`page-link ${pageNum === page ? 'active' : ''}`}
                    onClick={() => setPage(pageNum)}
                    aria-label={`Go to page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                className="page-link"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
}