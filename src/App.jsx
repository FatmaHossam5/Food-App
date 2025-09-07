import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import ForgetPassword from './AuthModule/Components/ForgetPassword/ForgetPassword'
import Login from './AuthModule/Components/Login/Login'
import Register from './AuthModule/Components/Register/Register'
import RequestResetPassword from './AuthModule/Components/RequestResetPassword/RequestResetPassword'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import CategoriesList from './CategoriesModule/Compponents/CategoriesList/CategoriesList'
import Home from './HomeModule/Components/Home/Home'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'
import Masterlayout from './SharedModules/Components/Masterlayout/Masterlayout'
import NotFound from './SharedModules/Components/NotFound/NotFound'
import ProtectedRoute from './SharedModules/Components/ProtectedRoute/ProtectedRoute'
import UserList from './UsersModule/Components/UserList/UserList'
import AuthLayout from './SharedModules/Components/Authlayout/AuthLayout '

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
