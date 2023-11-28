import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './HomeModule/Components/Home/Home'
import Login from './AuthModule/Components/Login/Login'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Masterlayout from './SharedModules/Components/Masterlayout/Masterlayout'
import NotFound from './SharedModules/Components/NotFound/NotFound'
import UserList from './UsersModule/Components/UserList/userList'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import CategoriesList from './CategoriesModule/Compponents/CategoriesList/CategoriesList'
import Authlayout from './SharedModules/Components/Authlayout/Authlayout'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword'
import ProtectedRoute from './SharedModules/Components/ProtectedRoute/ProtectedRoute'
import { jwtDecode } from 'jwt-decode'
import RequestResetPassword from './AuthModule/Components/RequestResetPassword/RequestResetPassword'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import { ToastContainer } from 'react-toastify'


function App() {
  const[adminData,setAdminData]=useState(null)
 
  let saveAdminData=()=>{
    let encodedToken=localStorage.getItem("adminToken");
    let decodedToken= jwtDecode(encodedToken)
    setAdminData(decodedToken)
  
  }
  useEffect(()=>{
    if(localStorage.getItem("adminToken")){
      saveAdminData()
    }
  },[])
 const routes=createBrowserRouter([
  {path:"/dashboard",
element: <ProtectedRoute adminData={adminData}> <Masterlayout adminData={adminData} />  </ProtectedRoute>,


errorElement:<NotFound/>,
children:[{index:true,element:<Home/>},
{path:"users",element:<UserList/>},
{path:"recipes",element:<RecipesList/>},
{path:"categories",element:<CategoriesList/>}
]},
  {
    path:"",
    element:  <Authlayout/> ,
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<Login saveAdminData={saveAdminData} />},
      {path:"/login",element:<Login saveAdminData={saveAdminData} />},
      {path:"/forgetPassword",element:<ForgetPassword/>},
      {path:"/RequestResetPassword",element:<RequestResetPassword/>},
      {path:"/ResetPassword",element:<ResetPassword/>}
    ]
  }
 ])

  return (
    <>
 <RouterProvider router={routes}/>
 <ToastContainer />
    </>
  )
}

export default App
