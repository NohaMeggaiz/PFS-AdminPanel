import React, { useState } from "react";
import './AddProduct.css'
import upload from '../../assets/upload_area.svg'

const AddProduct = ()=>{

    const [image,setImage]=useState(false);
    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    }) 

    const imageHandler =(e)=>{
        setImage(e.target.files[0]);

    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const Add_product = async () => {
        console.log(productDetails);
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);
    
        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
    
            const responseData = await response.json();
    
            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);
                await fetch('http://localhost:4000/addproduct',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(product),
                }).then((resp)=>resp.json()).then((data)=>{
                    data.success?alert("Product added"):alert("Failed")
                })


            } else {
                console.error('Upload failed:', responseData.error);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    


  return(
    <div className="AddProduct ">
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="type here" />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
               <p>Price</p>
               <input value={productDetails.old_price} onChange={changeHandler}   type="text" name="old_price" placeholder="type here" />
            </div>
            <div className="addproduct-itemfield">
               <p>Offer Price</p>
               <input value={productDetails.new_price} onChange={changeHandler}  type="text" name="new_price" placeholder="type here" />
            </div>

        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler}  name="category"className="addproduct-selector" >
                <option value="women">women</option>
                <option value="men">men</option>
                <option value="kid">kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload} className="addproduct-upimg" alt="" />
            </label>
            <input  onChange={imageHandler} type="file" name="image" id="file-input" hidden />
        </div>
        <button onClick={()=>{Add_product()}} className="addproduct-button" >ADD</button>

    </div>
  )
}

export default AddProduct