import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import { Routes, Route, Router } from "react-router-dom";
import UpdateProd from "./Components/UpdateProd/UpdateProd";

const App = ()=>{
  return(
    <div>
      <Navbar></Navbar>
      <Admin></Admin>
     
      

    </div>
  )
}

export default App