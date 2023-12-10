import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../../../assets/imgs/3.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ForgetPassword from '../../../AuthModule/Components/ForgetPassword/ForgetPassword';

export default function SideBar() {
  let navigate=useNavigate()
  let [isCollapsed,setIsCollapsed]=useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let handleToggle =()=>{
    setIsCollapsed(!isCollapsed)
  }
  let logOut =()=>{
    localStorage.removeItem("adminToken")
    navigate('/login')
  }
  return (


    <div className='sideBar-Container'>
        

    <Modal show={show} onHide={handleClose}>
     
      <Modal.Body>
        <ForgetPassword handleClose={handleClose}/>
      </Modal.Body>
     
    </Modal>

    <Sidebar collapsed={!isCollapsed}>
<Menu>
<MenuItem className='logo' onClick={ handleToggle} icon={<img src={logo}alt='logo' />}  >  </MenuItem>
  
    <MenuItem icon={<i className="fa-solid fa-house" ></i>} component={<Link to ='/dashboard'/>}> Home </MenuItem>
    <MenuItem  icon={ <i className="fa-regular fa-user"></i>} component={<Link to ='/dashboard/users'/>}> Users </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-qrcode"></i>} component={<Link to ='/dashboard/recipes'/>}> Recipes </MenuItem>
    <MenuItem icon={<i className="fa-regular fa-calendar"></i>} component={<Link to ='/dashboard/categories'/>}> Categories </MenuItem>


  <MenuItem onClick={handleShow} icon={<i className="fa-solid fa-lock"></i>} > Change Password </MenuItem>
  <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logOut}> logOut </MenuItem>



</Menu>
</Sidebar >
  </div>

    
  )
}
