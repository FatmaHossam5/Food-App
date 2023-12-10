import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import axios from 'axios'
import NoData from '../../../SharedModules/Components/NoData/NoData'
import DataNo from '../../../assets/imgs/DataNo.svg'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

export default function CategoriesList() {
  const {register,handleSubmit,formState:{errors},setValue}= useForm();
  const[CategoriesList,setCategoriesList]= useState([]);
  const[modalState,setModalState]=useState("close");
  const[itemId,setItemId]=useState(0)
  const[pagesArray,setPagesArray]=useState([])
  const[searchInput,setSearchInput]=useState("")
 
  const getCategoriesList = (pageNo,name) => {
    axios.get("https://upskilling-egypt.com:443/api/v1/Category/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      },params:{
        pageSize:5,
        pageNumber:pageNo,
        name

      }
    }).then((response) => {
      setCategoriesList(response.data.data)
    setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
     
    }).catch((error) => {
      console.log(error);
    })
  }
  const handleClose = () => setModalState("close");

  const showAddModel=()=>{
    setModalState("add-category")
  }
  const onSubmit=(data)=>{
axios.post("https://upskilling-egypt.com:443/api/v1/Category/",data,{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("adminToken")}`
  }
}).then((response)=>{
  handleClose()

  getCategoriesList()
}).catch((error)=>{
  console.log(error);
})
  }
  const showUpdateCategory =(categoryItem)=>{
    setModalState("update-category")
    setItemId(categoryItem.id)
    setValue("name",categoryItem.name)
      }
const updateCategory =(data)=>{
axios.put(`https://upskilling-egypt.com:443/api/v1/Category/${itemId}`,data,
{headers:{Authorization:`Bearer ${localStorage.getItem('adminToken')}`}}
).then((response)=>{
  handleClose();
  getCategoriesList()
}).catch((error)=>{
  console.log(error);
})
}
const showDeleteCategory =(id)=>{
  setModalState("delete-category")
  setItemId(id)
  
    }
const deleteCategory =()=>{
      axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${itemId}`,{headers:{
        Authorization:`Bearer ${localStorage.getItem('adminToken')}`
      }}).then((response)=>{
        console.log(response);
        getCategoriesList()
        handleClose()
      }).catch((error)=>{
        console.log(error);
      })
    }
const getNameValue =(input)=>{
  setSearchInput(input.target.value)
  getCategoriesList(1,input.target.value)
}
  useEffect(()=>{
   getCategoriesList(1)
  },[])
  return (<>
  <Header title={'welcome Categories'} paragraph={'categories'}/>
  <Modal show={modalState==='add-category'} onHide={handleClose}>
       
       <Modal.Body>
    <h4>Add New Category </h4>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group my-3">
        
          <input className="form-control" placeholder='category Name' type="text" {...register("name",{required:true})} />
          {errors.name&&errors.name.type==='required'&&(<span className='text-danger'>field is required</span>)
          }
     
      </div>
      <div className="form-group text-end">
        <button className='btn btn-success'> save </button>
      </div>

    </form>
       </Modal.Body>
      
     </Modal>
  <Modal show={modalState==='update-category'} onHide={handleClose}>
       
       <Modal.Body>
    <h4>update Category </h4>
    <form  onSubmit={handleSubmit(updateCategory)}>
      <div className="form-group my-3">
        
          <input className="form-control" placeholder='category Name' type="text" {...register("name",{required:true})} />
          {errors.name&&errors.name.type==='required'&&(<span className='text-danger'>field is required</span>)
          }
     
      </div>
      <div className="form-group text-end">
        <button className='btn btn-success'> update </button>
      </div>

    </form>
       </Modal.Body>
      
     </Modal>
     <Modal show={modalState==='delete-category'} onHide={handleClose}>
       
       <Modal.Body>
        <div className="delete-container">
          <div className="icons text-end">
        <i className="fa-regular fa-circle-xmark text-danger "></i>
          </div>
          <div className="img-container text-center ">
          <img  src={DataNo} alt="msg-NoData" />
          <h5 className='py-3'> Delete This Category ? </h5>
          <span>are you sure you want to delete this item ? if you are sure just click on delete it</span>

          </div>
          <div className="delete-btn text-end">
            <button onClick={deleteCategory} className='text-danger border-danger rounded-2 bg-white'>Delete This Item </button>
          </div>
        </div>
   
   
       </Modal.Body>
      
     </Modal>

     <div className="container ">
      <div className="addedCategory d-flex justify-content-between m-4">
        <div className="leftS">
          <h4>
          Categories Table Details
          </h4>
          <span>You can check all details</span>
        </div>
        <button onClick={showAddModel} className='btn btn-success'>Add New Category</button>
      </div>

     </div>

     <div className="inputs col-md-9 m-auto position-relative">
      <i className='fa-solid fa-search position-absolute top-25 '></i>
     <input onChange={getNameValue} className='form-control my-2' type="text" placeholder='  Search Here' />
     </div>

     {CategoriesList.length > 0 ? <div className=''>
        <div className='container m-auto'>
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>
          <tbody>
            {CategoriesList.map((category, index) => <>
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{category.name}</td>
                <td>   <i onClick={() => showUpdateCategory(category)} className='fa fa-edit  text-warning me-3'></i>
                  <i onClick={() => showDeleteCategory(category.id)} className='fa fa-trash  text-danger'></i> </td>

              </tr>
            </>)}
          </tbody>
        </table>
        
        <nav aria-label="...">
  <ul className="pagination pagination-l">
    {pagesArray.map((pageNo)=>
    
    <li key={pageNo} onClick={()=>getCategoriesList(pageNo,searchInput)} className="page-item"><a className="page-link">{pageNo}</a></li>
    
    
    
    )}
  
  </ul>
</nav>
        </div>
       
      </div> : (<NoData />)}
  
     
</>

  )
}
