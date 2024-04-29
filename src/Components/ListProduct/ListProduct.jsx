import React, { useEffect, useState } from "react";
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png';
import upicon from '../../assets/up_icon.png'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



const ListProduct = ()=>{

  
  


  const [allproducts,setAllProducts]=useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{
      setAllProducts(data)
    });
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product= async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

 
  return(
    <div className="ListProduct ">
      <h1>All Products List</h1>
      <div className="listproduct-main-format">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
              return <> <div key={index} className="listproduct-main-format listproduct-format " >
                <img src={product.image} alt="" className="listproduct-image" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt="" />
                
                <div className="icon-link">
                  <Link to={`/update/${product.id}`} >
                    <img className="listproduct-update-icon" src={upicon} alt="" />
                  </Link>
                </div>
              </div>
              <hr />
              </>
        })}
      </div>

    </div>
  )
}

export default ListProduct