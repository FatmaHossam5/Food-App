import React from 'react'
import Header from '../../../SharedModules/Components/Header/Header'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <Header title={'Home'} paragraph={'homeeeeeee'}/>
    <div className='row section-container mx-4 rounded-2 align-items-center'>
      <div className="col-md-6">
        <div>
          <h4> Fill The Recipes !</h4>
          <p>
          You can now add your items that any user can order it from the Application and you can edit
          </p>
        </div>
      </div>
      <div className="col-md-6">
        <div className='text-end'>
         <button className='btn btn-success'>

          <Link to ='/dashboard/recipes' className='text-white text-decoration-none'>
          Fill Recipe <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </Link>
           </button>
        </div>
      </div>
      </div>
    </>
    
  )
}
