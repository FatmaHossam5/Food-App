import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './HomeModule/Components/Home/Home'
import Login from './AuthModule/Components/Login/Login'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Masterlayout from './SharedModules/Components/Masterlayout/Masterlayout'
import NotFound from './SharedModules/Components/NotFound/NotFound'
import UserList from './UsersModule/Components/UserList/UserList'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import CategoriesList from './CategoriesModule/Compponents/CategoriesList/CategoriesList'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword'
import ProtectedRoute from './SharedModules/Components/ProtectedRoute/ProtectedRoute'
import { jwtDecode } from 'jwt-decode'
import RequestResetPassword from './AuthModule/Components/RequestResetPassword/RequestResetPassword'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import { ToastContainer } from 'react-toastify'
import Register from './AuthModule/Components/Register/Register'
import AuthLayout from './SharedModules/Components/Authlayout/AuthLayout '
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

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
children:[{index:true,element:<Home adminData={adminData}/>},
{path:"users",element:<UserList/>},
{path:"recipes",element:<RecipesList/>},
{path:"categories",element:<CategoriesList/>}
]},
  {
    path:"",
    element:  <AuthLayout/> ,
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<Login saveAdminData={saveAdminData} />},
      {path:"/login",element:<Login saveAdminData={saveAdminData} />},
      {path:"/forgetPassword",element:<ForgetPassword/>},
      {path:"/RequestResetPassword",element:<RequestResetPassword/>},
      {path:"/ResetPassword",element:<ResetPassword/>},
      {path:"/register",element:<Register/>}
    ]
  }
 ])

  return (
    <>
 <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ToastContainer />
    </QueryClientProvider>
    </>
  )
}

export default App
