import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import NoData from '../../../SharedModules/Components/NoData/NoData'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import avatar from '../../../assets/imgs/avatar.png'
import DataNo from '../../../assets/imgs/DataNo.svg'
import { ToastContainer, toast } from 'react-toastify';



export default function RecipesList() {
  const[recipeList,setRecipeList]=useState([])
  const[modalState,setModalState]=useState("close")
  const[tag,setTag]=useState([])
  const[categoryList,setCategoryList]=useState([])
   const {register,handleSubmit,formState:{errors},setValue}=useForm()
   const[itemId,setItemId]=useState(0)
  const[pagesArray,setPagesArray]=useState([])

   const[recipe,setRecipe]=useState()
   const[searchTagId,setSearchTagId]=useState()
   const[searchCatId,setSearchCatId]=useState()
  const[searchInput,setSearchInput]=useState("")
   



  const handleClose = () => setModalState("close");
 
   
  const addRecipe =(data)=>{

const addFormData =new FormData();
addFormData.append("name",data['name'])
addFormData.append("price",data['price'])
addFormData.append("description",data['description'])
addFormData.append("tagId",data['tagId'])
addFormData.append("categoriesIds",data['categoriesIds'])
addFormData.append("recipeImage",data['recipeImage'][0])
axios.post("https://upskilling-egypt.com:443/api/v1/Recipe/",addFormData,{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("adminToken")}`,
    'Content-Type': 'multipart/form-data',
  }
}).then((response)=>{console.log(response);
  handleClose()
  getAllRecipes()
}).catch((error)=>{
  console.log(error);
})

    
  }
  const updateRecipe=(data)=>{
    const addFormData =new FormData();
addFormData.append("name",data['name'])
addFormData.append("price",data['price'])
addFormData.append("description",data['description'])
addFormData.append("tagId",data['tagId'])
addFormData.append("categoriesIds",data['categoriesIds'])
addFormData.append("recipeImage",data['recipeImage'][0])
    axios.put(`https://upskilling-egypt.com:443/api/v1/Recipe/${itemId}`,addFormData,
    {headers:{Authorization:`Bearer ${localStorage.getItem('adminToken')}`,
    'Content-Type': 'multipart/form-data',}}
    ).then((response)=>{
      console.log(response);
      handleClose()
      getAllRecipes()
    }).catch((error)=>{
      console.log(error);
    })
   

  }
  const showAddModel = ()=>{
   
    
    setModalState("add-modal")
  }
   const showUpdateModal =(item)=>{
   
    setRecipe(item)
    setValue("name",item.name)
    setValue("price",item.price)
    setValue("description",item.description)
    setValue("tagId",item.tag?.id)
    setValue("categoriesIds",item.category[0]?.id)
    setValue("imagePath",item?.imagePath)
    setItemId(item.id)
    setModalState("update-modal")

   }

   const showDeleteRecipe =(id)=>{
    setModalState("delete-modal")
    setItemId(id)
    
      }
      const deleteRecipe =()=>{
        axios.delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${itemId}`,{headers:{
          Authorization:`Bearer ${localStorage.getItem('adminToken')}`
        }}).then((response)=>{
          console.log(response);
          toast('Deleted !')
          getAllRecipes()
          handleClose()
        }).catch((error)=>{
         toast(error?.response?.data?.message)
        })
      }
  const getAllRecipes =(pageNo,name,tagId,categoryId)=>{
    axios.get("https://upskilling-egypt.com:443/api/v1/Recipe/",{headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`

      
    },params:{
      pageSize:10,
      pageNumber:pageNo,
      name,
      tagId,
      categoryId,
    }

    }).then((response)=>{
    
      setRecipeList(response?.data?.data);
      setPagesArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
    }).catch((error)=>{
      console.log(error);
    })
  }
  const getCategoryId =()=>{
    axios.get("https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",{headers:{
      Authorization:`Bearer ${localStorage.getItem("adminToken")}`

      
    },

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
 
const getNameValue =(name)=>{
 setSearchInput(name.target.value);
 getAllRecipes(1,name.target.value)
}

  const getTagValue = (select)=>{
    setSearchTagId(select.target.value)
    getAllRecipes(1,searchInput,select.target.value,searchCatId);
  }
  const getCategoryValue =(select)=>{
    setSearchCatId(select.target.value)
    getAllRecipes(1,searchInput,searchTagId,select.target.value)


  }
  useEffect(()=>{
    getTagId();
    getCategoryId();

getAllRecipes(1);

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
  
     <Modal show={modalState==="update-modal"} onHide={handleClose}>
       
       <Modal.Body>
    <h4>Add New Recipe </h4>
    <form onSubmit={handleSubmit(updateRecipe)}>
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
        <button  className='btn btn-success'> save </button>
      </div>

    </form>
       </Modal.Body>
      
     </Modal>
   
     <Modal show={modalState==='delete-modal'} onHide={handleClose}>
       
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
            <button onClick={deleteRecipe} className='text-white bg-danger btn btn-outline-danger   border-danger rounded-2  '>Delete This Item </button>
          </div>
        </div>
   
   
       </Modal.Body>
      
     </Modal>
     <div className="container m-auto">
     <div className='col-md-12 m-3 d-flex justify-content-between'>
      <div className="col-md-6 ">
      <h6>
            Recipes Table Details
            </h6>
            <span>You can check all details</span>
      </div>
   
           
           <button onClick={ showAddModel}  className='btn btn-success'>Add New Item</button>
        
      </div>
     
       
        <div className="inputs d-flex justify-content-between mb-2">
        <div className="col-md-4 me-2">
          <input onChange={getNameValue} className='form-control' placeholder='search by name'  type="text" />
        </div>
        <div className="col-md-3 ">
        <select onChange={getTagValue} className='form-select' >
          <option value="">select Tag</option>
                {tag ? tag.map((t) => <option value={t.id}>{t.name}</option>) : null}


              </select>
        </div>
        <div className="col-md-3 ">
        <select onChange={getCategoryValue} className='form-select' >
          <option value="">select Category</option>
                {categoryList ? categoryList.map((cat) => <option value={cat.id}>{cat.name}</option>) : null}


              </select>
        </div>

        </div>
       
        {recipeList.length>0?  <div className=''>
      <table class="table table-striped text-center">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Item Name</th>
      <th scope="col">Image</th>
   
      <th scope="col">Description</th>
      <th scope="col">Price</th>
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

    <td>
      <div className="img-container">
      {recipe.imagePath?(<img className='img-fluid' src={`https://upskilling-egypt.com/`+recipe.imagePath} />):(<img className='img-fluid'src={avatar}/>)}

      </div>
      </td>
    <td>{recipe.description}</td>
    <td>{recipe.price}</td>
    <td>{recipe.tag?.name}</td>
    <td>{recipe.category[0]?.name}</td>
 



<td>
  <i onClick={()=>showUpdateModal(recipe)} className='fa fa-edit text-warning mx-2'></i>
  <i onClick={()=>showDeleteRecipe(recipe.id)} className='fa fa-trash text-danger  mx-2'></i>

</td>


   
  </tr>
  </>)}
  
  </tbody>
</table>
<nav aria-label="...">
  <ul className="pagination pagination-sm">
   {pagesArray.map((pageNo)=>    <li  className="page-item"><a onClick={()=>getAllRecipes(pageNo,searchInput)} className="page-link">{pageNo}</a></li>
)}
    
    
    
    
    
  
  </ul>
</nav>
      </div>
      :(<NoData/>)}
      
      </div>



   
        
   </>
  )
}
