import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
  let navigate=useNavigate()
  let logOut =()=>{
    localStorage.removeItem("adminToken")
    navigate('/login')
  }
  return (
    <div>SideBar
      <button className='btn btn-danger' onClick={logOut}> log out</button>
    </div>
  )
}
