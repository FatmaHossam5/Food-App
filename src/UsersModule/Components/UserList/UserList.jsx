import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import DataNo from '../../../assets/imgs/DataNo.svg'
import avatar from '../../../assets/imgs/avatar.png'
import { ToastContainer, toast } from 'react-toastify';



export default function UserList() {
const[UserList,setUserList]=useState([])
const [pagesArray,setPagesArray]=useState([])
const[searchInput,setSearchInput]=useState()
const[searchRole,setSearchRole]=useState()
const[modalState,setModalState]=useState("close");
const[itemId,setItemId]=useState(0)


const showDeleteModal =(id)=>{
  setModalState("delete-user")
  setItemId(id)
  
    }
  const handleClose = () => setModalState("close");


const getUsersList =(pageNo,userName,groups)=>{
axios.get("https://upskilling-egypt.com:3006/api/v1/Users/",{
  headers:{Authorization:`Bearer ${localStorage.getItem("adminToken")}`},
  params:{pageSize:10,
    pageNumber:pageNo,
    userName,
    groups
  }
})
  .then((response)=>{
  console.log(response?.data?.data);
  setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))

  setUserList(response?.data?.data)
}).catch((error)=>{console.log(error);})
}
const getNameValue =(select)=>{
setSearchInput(select.target.value)
getUsersList(1,select.target.value,searchRole)
}
 const getRoleValue =(select)=>{
  setSearchRole(select.target.value)
  getUsersList(1,searchInput,select.target.value)
 }


 const deleteUser =()=>{
  axios.delete(`https://upskilling-egypt.com:443/api/v1/Users/${itemId}`,{headers:{
    Authorization:`Bearer ${localStorage.getItem('adminToken')}`
  }}).then((response)=>{
    console.log(response);
    handleClose()
    getUsersList()

  }).catch((error)=>{
    console.log(error);
  })
 }
useEffect(()=>{
  getUsersList(1)
},[])
  return (
   <>
   
   <Header title={"Users List"} paragraph={'You can now add your items that any user can order it from the Application and you can edit'}/>
   <Modal show={modalState==='delete-user'} onHide={handleClose}>
       
       <Modal.Body>
       <div className="delete-container">
          <div className="icons text-end">
        <i onClick={handleClose} className="fa-regular fa-circle-xmark text-danger "></i>
          </div>
          <div className="text-center">
            <div className="text-center">
            <img className=' '  src={DataNo} alt="msg-NoData" />
            </div>
            <h5 className='py-3'> Delete This Favorite Item ? </h5>
          <span>are you sure you want to delete this item ? if you are sure just click on delete it</span>
          </div>
         

         
          <div className="delete-btn text-end">
            <button onClick={deleteUser} className='text-white bg-danger btn btn-outline-danger   border-danger rounded-2  '>Delete This Item </button>
          </div>
        </div>
   
   
       </Modal.Body>
      
     </Modal>
  
  
   <div className="container m-auto">
    <div className="col-md-12 m-3">
    <h5>Users Table Details</h5>
   <span>You can check all details</span>
    </div>
  
<div className="inputs d-flex justify-content-evenly mb-3  ">
  <div className="col-md-5 ">
  <input onChange={getNameValue} type="text" className='col-md-4 form-control'placeholder='search By UserName' />

  </div>
  <div className="col-md-4 ms-5">
  <select onChange={getRoleValue} className="form-select">
                  <option value="" className="text-muted">
                    search by role
                  </option>
                  <option value="1">admin</option>
                  <option value="2">user</option>
                </select>

  </div>
</div>

 
   <table class="table  table-striped">
  <thead>
    <tr>
      
      <th scope="col">#</th>
      <th scope="col"> Name</th>
      <th scope="col">Image</th>
      <th scope="col">GroupName</th>
      <th scope="col">Phone</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>


      

    </tr>
  </thead>
  <tbody>
    {UserList.map((user,index)=><>

      <tr>
      <th scope="row">{index+1}</th>
      <td>{user.userName}</td>
      
   
      <td>
      <div className="img-container">
      {user.imagePath?(<img className='img-fluid' src={`https://upskilling-egypt.com/`+user.imagePath} />):(<img className='img-fluid'src={avatar}/>)}

      </div>
      </td>
      

    
      <td className='role'>{user.group.name}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.email}</td>
      <td> <i onClick={()=>showDeleteModal(user.id)} className='fa-solid fa-trash text-danger'></i> </td>




    </tr>
    </>)}
   
   
 
  </tbody>
</table>
<nav aria-label="...">
  <ul className="pagination pagination-l">
   {pagesArray.map((pageNo)=>    <li  className="page-item"><a onClick={()=>getUsersList(pageNo,searchInput,searchRole)} className="page-link">{pageNo}</a></li>
)}
    
    
    
    
    
  
  </ul>
</nav>
   </div>
   
   </>
  )
}
