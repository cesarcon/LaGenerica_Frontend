import React from "react";
import { Component } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class AgregarCliente extends Component{
    cedulaCliente = React.createRef();
    direccionCliente = React.createRef();
    emailCliente = React.createRef();
    nombreCliente = React.createRef();
    telefonoCliente = React.createRef();
 
    state = {
        clientes:[],
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

    guardarCliente = (e) =>{
        e.preventDefault();
        var proveedor = {
            cedulaCliente:this.cedulaCliente.current.value,
            direccionCliente:this.direccionCliente.current.value,
            emailCliente:this.emailCliente.current.value,
            nombreCliente:this.nombreCliente.current.value,
            telefonoCliente:this.telefonoCliente.current.value,
        }

        axios.post("http://localhost:8080/addCliente", proveedor)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
    }

    render(){
        if(this.state.status === "success"){
            return<Navigate to ="/clientes" />
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
                <h1>Agregar Clientes</h1>
                <form onSubmit = {this.guardarCliente}>
               
                    <div>
                        <label> Cedula del Cliente</label>
                        <input type = "text" name = "nit" ref={this.cedulaCliente}/>
                    </div>
                    <div>
                        <label> Nombre del Cliente</label>
                        <input type = "text" name = "nombre" ref={this.nombreCliente}/>
                    </div>
                    <div>
                        <label> Dirección</label>
                        <input type = "text" name = "direccion" ref={this.direccionCliente}/>
                    </div>
                    <div>
                        <label> Teléfono</label>
                        <input type = "text" name = "telefono" ref={this.telefonoCliente}/>
                    </div>
                    <div>
                        <label> Correo Electronico</label>
                        <input type = "text" name = "ciudad" ref={this.emailCliente}/>
                    </div>
                    <div>
                     <input type = "submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AgregarCliente;