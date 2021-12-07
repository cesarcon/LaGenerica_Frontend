import React from "react";
import { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class Usuarios extends Component{
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

    componentWillMount(){
        this.getUsuarios();
    }

    getUsuarios = () =>{
        axios.get("http://localhost:8080/consultarUsuarios")
           .then(res => {
               console.log(res.data);
               this.setState({
                   usuarios:res.data
               })
           });
    }

    borrarUsuario = (id) =>{
        var resultado = window.confirm('¿Estas seguro de borrar el usuario?');
        if (resultado){
            axios.delete("http://localhost:8080/borrarUsuario/" + id)
            .then(res=>{
                this.setState({
                    status:"deleted"
                });
    
                window.location.reload(true);
            })
        }

    }
    render() {
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
             
             <h1> Usuarios</h1>
             <Link to = "/agregarUsuario">Agregar Usuario</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Cédula del Usuario</th>
                            <th>Correo</th>
                            <th>Nombre</th>
                            <th>Password</th>
                            <th>Usuario</th>
                            <th>Ciudad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.usuarios.map(
                                usuario =>
                                <tr key = {usuario.cedulaUsuario}>
                                    <td> {usuario.cedulaUsuario}</td>
                                    <td> {usuario.emailUsuario}</td>
                                    <td> {usuario.nombreUsuario}</td>
                                    <td> {usuario.password}</td>
                                    <td> {usuario.usuario}</td>
                                    <td> {usuario.ciudad}</td>
                                    <td>
                                         <button> Editar</button>
                                         <button onClick = {()=>{ this.borrarUsuario(usuario.cedulaUsuario)}}> Eliminar</button>
                                    </td>
                                    </tr>

                            )
                        }

                        
                    </tbody>
                </table>
               </div>      
        );
    }
}

export default Usuarios;