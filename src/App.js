import './App.css';

import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AgregarProducto from "./Components/AgregarProducto";
import AgregarProveedor from "./Components/AgregarProveedor";

import Clientes from "./Components/Clientes";
import Productos from "./Components/Productos";
import Proveedores from "./Components/Proveedores";
import Login from "./Components/Login";
import Menu from './Components/Menu';
import AgregarCliente from './Components/AgregarCliente';
import Usuarios from './Components/Usuarios';
import AgregarUsuario from './Components/AgregarUsuario';


function App() {

  return (

    <div className="App">
  
      <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login />} />
          <Route path = "/menu" element = {<Menu />} /> 
          <Route path = "/productos" element = {<Productos />} />
          <Route path = "/proveedores" element = {<Proveedores />} />
          <Route path = "/clientes" element = {<Clientes />} />
          <Route path = "/usuarios" element = {<Usuarios />} />
          <Route path = "/agregarProducto" element = {<AgregarProducto />} />
          <Route path = "/agregarProveedor" element = {<AgregarProveedor />} />  
          <Route path = "/agregarCliente" element = {<AgregarCliente />} />  
          <Route path = "/agregarUsuario" element = {<AgregarUsuario />} /> 
        </Routes>
      </BrowserRouter>
      </div>
    </div>
   
  );
}

export default App;
