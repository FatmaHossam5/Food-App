import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import NoData from '../../../SharedModules/Components/NoData/NoData'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

export default function RecipesList() {
  const[recipeList,setRecipeList]=useState([])
  const[modalState,setModalState]=useState("close")
  const[tag,setTag]=useState([])
  const[categoryList,setCategoryList]=useState([])
   const {register,handleSubmit,formState:{errors}}=useForm()


  const handleClose = () => setModalState("close");
  const handleShow = () =>setShow(true);
   
  const addRecipe =(data)=>{

const addFormData =new FormData();
addFormData.append("name",data['name'])
addFormData.append("price",data['price'])
addFormData.append("description",data['description'])
addFormData.append("tagId",data['tagId'])
addFormData.append("categoriesIds",data['categoriesIds'])
addFormData.append("recipeImage",data['recipeImage'][0])
axios.post("https://upskilling-egypt.com:443/api/v1/Recipe/",addFormData,{headers:{Authorization:`Bearer ${localStorage.getItem("adminToken")}`}}).then((response)=>{
  handleClose()
  getAllRecipes()
}).catch((error)=>{
  console.log(error);
})

    
  }
  const showAddModel = ()=>{
    getTagId()
    getAllCategory()
    setModalState("add-modal")
    


  }
  const getAllRecipes =()=>{
    axios.get("https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=100&pageNumber=1",{headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`

      
    }

    }).then((response)=>{
      console.log(response);
      setRecipeList(response?.data?.data);
    }).catch((error)=>{
      console.log(error);
    })
  }
  const getAllCategory =()=>{
    axios.get("https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",{headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`

      
    }

    }).then((response)=>{
      console.log(response);
      setCategoryList(response?.data?.data);
    }).catch((error)=>{
      console.log(error);
    })
  }
  const getTagId=()=>{
    axios.get('https://upskilling-egypt.com:443/api/v1/tag/',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("adminToken")}`
      }
    }).then((response)=>{
      
      setTag(response?.data);
    }).catch((error)=>{
console.log(error);
    }
    )
  }
  useEffect(()=>{
getAllRecipes();

  },[])
  return (
   
   <>
        <Header title={"Recipe Items"} paragraph={'You can now add your items that any user can order it from the Application and you can edit'}/>
        <Modal show={modalState==="add-modal"} onHide={handleClose}>
       
       <Modal.Body>
    <h4>Add New Recipe </h4>
    <form onSubmit={handleSubmit(addRecipe)}>
            <div className="form-group my-3">

              <input {...register('name', { required: true })} className="form-control" placeholder='Recipe Name' type="text" />
              {errors.nama && errors.nama.type === 'requires' && (<span className='text-danger'> name is required</span>)}

            </div>
            <div className="form-group my-3">
              <input {...register('price', { required: true })} className="form-control" placeholder='Recipe Price' type="number" />
              {errors.price && errors.price.type === 'requires' && (<span className='text-danger'> name is required</span>)}

            </div>
            <div className="form-group my-3">
              <textarea {...register("description", { required: true })} className='form-control' placeholder='enter a description'>
              </textarea>
              {errors.description && errors.description.type === 'required' && (<span className='text-danger'> description is required</span>)}
            </div>
            <div className="form-group my-3">
              <select {...register("tagId")} className='form-control' >
                {tag ? tag.map((t) => <option value={t.id}>{t.name}</option>) : null}


              </select>

            </div>
            <div className="form-group my-3">
              <select {...register("categoriesIds")} className='form-control' >
                {categoryList ? categoryList.map((cat) => <option value={cat.id}>{cat.name}</option>) : null}


              </select>

            </div>
            <div className="form-group">
              <input type="file"{...register("recipeImage")} />
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
            Recipes Table Details
            </h6>
            <span>You can check all details</span>
          </div>

        </div>
        <div className="col-md-6 text-end">
          <div>
           <button onClick={ showAddModel}  className='btn btn-success'>Add New Item</button>
          </div>

        </div>
        {recipeList.length>0?  <div className=''>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Item Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Tag</th>
      <th scope="col">Category</th>
      <th scope="col">Actions</th>





    </tr>
  </thead>
  <tbody>
  {recipeList.map((recipe,index)=><>
  <tr >
    <th scope='row'>{index+1}</th>
    <td>{recipe.name}</td>
    <td><img src={`https://upskilling-egypt.com:443 `+recipe?.imagePath} alt="" /></td>
    <td>{recipe.description}</td>
    <td>{recipe.price}</td>
    <td>{recipe.category[0]?.name}</td>
    <td>{recipe.tag?.name}</td>






   
  </tr>
  </>)}
  
  </tbody>
</table>
      </div>
      :(<NoData/>)}
      
      </div>
   </>
  )
}
