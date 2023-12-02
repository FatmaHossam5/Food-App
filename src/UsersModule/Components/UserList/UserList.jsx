import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export default function UserList() {
const[UserList,setUserList]=useState([])
const [pagesArray,setPagesArray]=useState([])
const[searchInput,setSearchInput]=useState()
const[searchRole,setSearchRole]=useState()


const getUsersList =(pageNo,userName,groups)=>{
axios.get("https://upskilling-egypt.com:443/api/v1/Users/",{
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
useEffect(()=>{
  getUsersList(1)
},[])
  return (
   <>
   
   <Header title={"Users List"} paragraph={'You can now add your items that any user can order it from the Application and you can edit'}/>
   <div className="container ">
   <h5>Users Table Details</h5>
   <span>You can check all details</span>
<div className="inputs d-flex  ">
  <div className="col-md-4">
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

 
   <table class="table">
  <thead>
    <tr>
      
      <th scope="col">#</th>
      <th scope="col"> Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Category</th>

      

    </tr>
  </thead>
  <tbody>
    {UserList.map((user)=><>

      <tr>
      <th scope="row">{user.id}</th>
      <td>{user.userName}</td>
      
   
      <td>
        <div className='img-container'>
        <img className='img-fluid' src={`https://upskilling-egypt.com/`+user.imagePath} alt="" />

        </div>
        </td>

    
      <td>{user.group.name}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.email}</td>



    </tr>
    </>)}
   
   
 
  </tbody>
</table>
<nav aria-label="...">
  <ul className="pagination pagination-sm">
   {pagesArray.map((pageNo)=>    <li  className="page-item"><a onClick={()=>getUsersList(pageNo,searchInput,searchRole)} className="page-link">{pageNo}</a></li>
)}
    
    
    
    
    
  
  </ul>
</nav>
   </div>
   
   </>
  )
}
