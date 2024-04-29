import React, { useState, useEffect } from "react";
import './UpdateProd.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UpdateProd = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: ""
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:4000/findproduct/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                console.log('Retrieved product:', data.product);

                setProduct(data.product); // Assuming the server responds with a 'product' object
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = e => {
        setProduct(prevProduct => ({
            ...prevProduct,
            [e.target.name]: e.target.value
        }));
    };

    const navigate = useNavigate();


    const handleSubmit = async e => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:4000/updateproduct/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          });
          if (response.status === 200) {
            console.log('Product updated successfully');

            navigate('/Listproduct'); 
          }
        } catch (error) {
          console.error('Error updating product:', error);
        }
      };
    return (
        <div className="AddProduct">
            <h1>Update Product</h1>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Type here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input type="text" name="old_price" value={product.old_price} onChange={handleChange} placeholder="Type here" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type="text" name="new_price" value={product.new_price} onChange={handleChange} placeholder="Type here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" className="addproduct-selector" value={product.category} onChange={handleChange}>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img className="addproduct-upimg" src={product.image} alt="Product" />
                </label>
                <input type="file" name="image" id="file-input" hidden />
            </div>
            <button className="addproduct-button" onClick={handleSubmit}>Update</button>
        </div>
    );
};

export default UpdateProd;
