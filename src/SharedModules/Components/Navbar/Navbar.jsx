import React from 'react'
import avatar from '../../../assets/imgs/avatar.png'

export default function Navbar({adminData}) {
 console.log(adminData);
  return (

  <>


<nav className="navbar navbar-expand-lg navbar-light col-md-12 navbar rounded-3  ">
 
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>

 <div className="collapse navbar-collapse" id="navbarSupportedContent">
   <ul className="navbar-nav w-100 m-auto d-flex justify-content-between    ">
   <li className="nav-item ms-5 mt-2 position-relative ">
   <i className="fa-solid fa-magnifying-glass position-absolute ps-2 "></i>
     <input type="text" className='form-control NavIn ' placeholder='      Search Here' />
   </li>
  
     <li className="nav-item     ">
     
       
       <a className="nav-link text-black" href="#">   <img src={avatar} alt="avatar"className='pe-3' />{adminData?.userName} <i className="fa-solid fa-chevron-down"></i> <i className="fa-solid fa-bell ps-4"></i>   </a>
     </li>
     
   </ul>
 
 </div>
</nav>
 
  
  
  </>
  )
}
