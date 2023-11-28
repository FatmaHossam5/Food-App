import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import axios from 'axios'
import NoData from '../../../SharedModules/Components/NoData/NoData'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

export default function CategoriesList() {
  const {register,handleSubmit,formState:{errors}}= useForm();
  const getCategoriesList=()=>{
    axios.get("https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",{headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`

      
    }

    }).then((response)=>{
      setCategoriesList(response.data.data);
    }).catch((error)=>{
      console.log(error);
    })

  }
  const onSubmit=(data)=>{
axios.post("https://upskilling-egypt.com:443/api/v1/Category/",data,{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("adminToken")}`
  }
}).then((response)=>{
  handleClose()
  console.log(response);
  getCategoriesList()
}).catch((error)=>{
  console.log(error);
})
  }
  const[CategoriesList,setCategoriesList]= useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
   getCategoriesList()
  },[])
  return (<>
  <Header title={'welcom Categoties'} paragraph={'categories'}/>
  
  <Modal show={show} onHide={handleClose}>
       
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
      <div className='row  mx-4 p-3'>
        <div className="col-md-6">
          <div>
            <h6>
            Categories Table Details
            </h6>
            <span>You can check all details</span>
          </div>

        </div>
        <div className="col-md-6 text-end">
          <div>
           <button onClick={handleShow} className='btn btn-success'>Add New Category</button>
          </div>

        </div>
        {CategoriesList.length>0?  <div className=''>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category Name</th>
      <th scope="col">Actions</th>

    </tr>
  </thead>
  <tbody>
  {CategoriesList.map((category)=><>
  <tr key={category.id}>
    <th scope='row'>{category.id}</th>
    <td>{category.name}</td>
    <td></td>
  </tr>
  </>)}
  </tbody>
</table>
      </div>:(<NoData/>)}
      
      </div>
     
</>

  )
}
