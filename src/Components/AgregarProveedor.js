import React from "react";
import { Component } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class AgregarProveedor extends Component{
    nit = React.createRef();
    ciudad = React.createRef();
    direccion = React.createRef();
    nombre = React.createRef();
    telefono = React.createRef();
 
    state = {
        proveedores:[],
        status:null
    }

    cerrarSesion=()=>{
        cookies.remove('nombreUsuario', {path: "/"});
        cookies.remove('ciudad', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if (!cookies.get('nombreUsuario')){
            window.location.href="./";
        }
    }

    guardarProveedor = (e) =>{
        e.preventDefault();
        var proveedor = {
            nitproveedor:this.nit.current.value,
            ciudadProveedor:this.ciudad.current.value,
            direccionProveedor:this.direccion.current.value,
            nombreProveedor:this.nombre.current.value,
            telefonoProveedor:this.telefono.current.value,
        }

        axios.post("http://localhost:8080/addProveedor", proveedor)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
    }

    render(){
        if(this.state.status === "success"){
            return<Navigate to ="/proveedores" />
        }
        return(
            <div>
                <header className="App-header">
                <h1> Cadena de Tiendas la Generica - Sucursal {cookies.get('ciudad')}</h1>
                <br />
             <nav>
                  <ul>
                      <li>
                          <NavLink to = "/productos" activeClassName = "active" >Productos</NavLink>
                      </li>
                      <li>
                          <NavLink to = "/proveedores" activeClassName = "active" >Proveedores</NavLink>
                      </li>
                      <li>
                          <NavLink to = "/clientes" activeClassName = "active" >Clientes</NavLink>
                      </li>
                      <li>
                      <NavLink to = "/usuarios" activeClassName = "active" >Usuarios</NavLink>
                      </li>

                  </ul>
             </nav>
             <br />
                <button onClick={()=>this.cerrarSesion()}>Cerrar Sesion</button>
             </header>
                <h1>Agregar Proveedor</h1>
                <form onSubmit = {this.guardarProveedor}>
               
                    <div>
                        <label> NIT del proveedor</label>
                        <input type = "text" name = "nit" ref={this.nit}/>
                    </div>
                    <div>
                        <label> Nombre del proveedor</label>
                        <input type = "text" name = "nombre" ref={this.nombre}/>
                    </div>
                    <div>
                        <label> Dirección</label>
                        <input type = "text" name = "direccion" ref={this.direccion}/>
                    </div>
                    <div>
                        <label> Teléfono</label>
                        <input type = "text" name = "telefono" ref={this.telefono}/>
                    </div>
                    <div>
                        <label> Ciudad</label>
                        <input type = "text" name = "ciudad" ref={this.ciudad}/>
                    </div>
                    <div>
                     <input type = "submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AgregarProveedor;