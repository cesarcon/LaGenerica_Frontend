import React from "react";
import { Component } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";
import md5 from "md5";

const cookies = new Cookies();

class AgregarUsuario extends Component{
    cedula = React.createRef();
    correo = React.createRef();
    nombre = React.createRef();
    clave = React.createRef();
    usuario = React.createRef();
    ciudad = React.createRef();

    state = {
        usuarios:[],
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

    guardarUsuario = (e) =>{
        e.preventDefault();
        var usuario = {
            cedulaUsuario:this.cedula.current.value,
            emailUsuario:this.correo.current.value,
            nombreUsuario:this.nombre.current.value,
            password:md5(this.clave.current.value),
            usuario:this.usuario.current.value,
            ciudad:this.ciudad.current.value,
        }

        axios.post("http://localhost:8080/addUsuario", usuario)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
    }

    render(){
        if(this.state.status === "success"){
            return<Navigate to ="/usuarios" />
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
                <h1>Agregar Usuario</h1>
                <form onSubmit = {this.guardarUsuario}>
               
                    <div>
                        <label> Cédula del Usuario</label>
                        <input type = "number" name = "cedula" ref={this.cedula}/>
                    </div>
                    <div>
                        <label> Email</label>
                        <input type = "email" name = "correo" ref={this.correo}/>
                    </div>
                    <div>
                        <label> Nombre</label>
                        <input type = "text" name = "nombre" ref={this.nombre}/>
                    </div>
                    <div>
                        <label> Contraseña</label>
                        <input type = "password" name = "clave" ref={this.clave}/>
                    </div>
                    <div>
                        <label> Usuario</label>
                        <input type = "text" name = "usuario" ref={this.usuario}/>
                    </div>
                    <div>
                        <label> Sucursal</label>
                        <select name = "ciudad" ref={this.ciudad}>
                            <option>Bogota</option> 
                            <option>Cali</option>
                            <option>Medellin</option>
                        </select>
                    </div>
                    <div>
                     <input type = "submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AgregarUsuario;