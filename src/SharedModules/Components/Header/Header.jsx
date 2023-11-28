import React from 'react'
import bg from '../../../assets/imgs/bg.png'
export default function Header({title,paragraph}) {
  return (
    <>
    <div className='header-content m-2 rounded-3 text-white h-25 px-2'> 
    <div className="container-fluid">
      <div className="row px-4 py-2 g-0 align-items-center">
        <div className="col-sm-10">
        <h3>{title}</h3>
    <p>{paragraph}</p>
        </div>
        <div className="col-md-2">
        <img  className='img-fluid' src={bg} alt="background" />
      </div>
      </div>

    </div>
    
      <div className="col-md-10">
        <div>
    

        </div>
     

      </div>
     
   
   
    </div>
    </>
  )
}
