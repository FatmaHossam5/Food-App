import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import Header from '../../../SharedModules/Components/Header/Header';
import NoData from '../../../SharedModules/Components/NoData/NoData';
import avatar from '../../../assets/imgs/avatar.png';
import DataNo from '../../../assets/imgs/DataNo.svg';
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

      {/* Add Modal */}
      {/* Add Modal */}
      <Modal show={modalState === 'add'} onHide={closeModal} centered  >
        <Modal.Header closeButton>
          <Modal.Title>Add New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onAdd)} encType="multipart/form-data">
            <div className="form-group mb-3">
              <input
                {...register('name', { required: true })}
                className="form-control"
                placeholder="Recipe Name"
                type="text"
              />
              {errors.name && <small className="text-danger">Name is required</small>}
            </div>

            <div className="form-group mb-3">
              <input
                {...register('price', { required: true })}
                className="form-control"
                placeholder="Recipe Price"
                type="number"
              />
              {errors.price && <small className="text-danger">Price is required</small>}
            </div>

            <div className="form-group mb-3">
              <textarea
                {...register('description', { required: true })}
                className="form-control"
                placeholder="Description"
              />
              {errors.description && <small className="text-danger">Description is required</small>}
            </div>

            <div className="form-group mb-3">
              <select {...register('tagId', { required: true })} className="form-select">
                <option value="">Select Tag</option>
                {tagData?.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              {errors.tagId && <small className="text-danger">Tag is required</small>}
            </div>

            <div className="form-group mb-3">
              <select {...register('categoriesIds', { required: true })} className="form-select">
                <option value="">Select Category</option>
                {catData?.data?.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.categoriesIds && <small className="text-danger">Category is required</small>}
            </div>

            <div className="form-group mb-3">
              <input
                type="file"
                {...register('recipeImage')}
                className="form-control"
                accept="image/*"
                placeholder="Recipe Image"

              />
              {errors.recipeImage && <small className="text-danger">Please upload a recipe image</small>}
            </div>

            <div className="text-end">
              <Button variant="success" type="submit">
                Save Recipe
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Update Modal */}
      <Modal
        show={modalState === 'update'}
        onHide={closeModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onUpdate)} encType="multipart/form-data">
            {/* Name */}
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Recipe Name</label>
              <input
                id="name"
                {...register('name', { required: true })}
                className="form-control"
                placeholder="Recipe Name"
                type="text"
              />
              {errors.name && <small className="text-danger">Name is required</small>}
            </div>

            {/* Price */}
            <div className="form-group mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                id="price"
                {...register('price', { required: true })}
                className="form-control"
                placeholder="Recipe Price"
                type="number"
              />
              {errors.price && <small className="text-danger">Price is required</small>}
            </div>

            {/* Description */}
            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                {...register('description', { required: true })}
                className="form-control"
                placeholder="Description"
              />
              {errors.description && <small className="text-danger">Description is required</small>}
            </div>

            {/* Tag */}
            <div className="form-group mb-3">
              <label htmlFor="tagId" className="form-label">Tag</label>
              <select
                id="tagId"
                {...register('tagId', { required: true })}
                className="form-select"
              >
                <option value="">Select Tag</option>
                {tagData?.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              {errors.tagId && <small className="text-danger">Tag is required</small>}
            </div>

            {/* Category */}
            <div className="form-group mb-3">
              <label htmlFor="categoriesIds" className="form-label">Category</label>
              <select
                id="categoriesIds"
                {...register('categoriesIds', { required: true })}
                className="form-select"
              >
                <option value="">Select Category</option>
                {catData?.data?.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.categoriesIds && <small className="text-danger">Category is required</small>}
            </div>

            {/* Current Image Preview */}
            {recipe?.imagePath && (
              <div className="mb-3 text-center">
                <p>Current Image:</p>
                <img
                  src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                  alt="Current Recipe"
                  className="img-thumbnail"
                  style={{ maxWidth: '120px' }}
                />
              </div>
            )}
            {/* New Image (optional) */}
            <div className="form-group mb-4">
              <label htmlFor="updateRecipeImage" className="form-label">
                New Recipe Image (optional)
              </label>
              <input
                id="updateRecipeImage"
                type="file"
                accept="image/*"
                {...register('recipeImage')}
                className="form-control"
              />
            </div>

            <div className="text-end">
              <Button variant="warning" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* Delete Modal */}
      <Modal show={modalState === 'delete'} onHide={closeModal}>
        <Modal.Body>
          <div className="delete-container">
            <div className="icons text-end">
              <i onClick={closeModal} className="fa-regular fa-circle-xmark text-danger" />
            </div>
            <div className="text-center">
              <img src={DataNo} alt="NoData" />
              <h5 className="py-3">Delete This Recipe?</h5>
              <span>Are you sure you want to delete this item?</span>
            </div>
            <div className="delete-btn text-end">
              <button onClick={onDelete} className="btn btn-danger">
                Delete This Item
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6>Recipes Table Details</h6>
            <span>You can check all details</span>
          </div>
          <button onClick={() => openModal('add')} className="btn btn-success">
            Add New Item
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="row mb-3 col-12">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              onChange={e => setFilters(f => ({ ...f, tagId: e.target.value }))}
            >
              <option value="">Select Tag</option>
              {tagData?.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              onChange={e => setFilters(f => ({ ...f, categoryId: e.target.value }))}
            >
              <option value="">Select Category</option>
              {catData?.data?.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipes Table */}
        {recipes.length > 0 ? (
          <table className="table-custom table-responsive text-center col-12">
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Tag</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.imagePath ? (
                      <img
                        className="img-fluid"
                        src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                        alt={item.name}
                        style={{ maxWidth: '60px', borderRadius: '4px' }}
                      />
                    ) : (
                      <div className="avatar-initials" style={{ width: '60px', height: '60px', margin: '0 auto' }}>
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.tag?.name}</td>
                  <td>{item.category[0]?.name}</td>
                  <td>
                    <i
                      className="fa fa-edit text-warning mx-2"
                      onClick={() => openModal('update', item)}
                    />
                    <i
                      className="fa fa-trash text-danger mx-2"
                      onClick={() => openModal('delete', item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}

        {/* Pagination */}
        <nav>
          <ul className="pagination pagination-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <li key={n} className={`page-item ${n === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPage(n)}>
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ToastContainer />
    </>
  );
}