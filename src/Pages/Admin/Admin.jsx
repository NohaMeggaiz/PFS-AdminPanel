import React from "react";
import './Admin.css'
import Sidebar from "../../Components/Sidebar/Sidebar";
import {Routes ,Route} from 'react-router-dom'
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import UpdateProd from "../../Components/UpdateProd/UpdateProd";

const Admin = ()=>{

  
  return(
     <div className="admin">  
      <Sidebar></Sidebar>
     
      <Routes>
        <Route path="/addproduct" element={<AddProduct/>}></Route>
        <Route path="/Listproduct" element={<ListProduct/>}></Route>
        <Route path="/update/:id" element={<UpdateProd/>}></Route>
      </Routes>

    </div>
  )
}

export default Admin