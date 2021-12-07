import React from "react";
import { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const cookies = new Cookies();

class Clientes extends Component{
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

    componentWillMount(){
        this.getClientes();
    }

    getClientes = () =>{
        axios.get("http://localhost:8080/consultarClientes")
           .then(res => {
               console.log(res.data);
               this.setState({
                   clientes:res.data
               })
           });
    }

    borrarCliente = (id) =>{
        var resultado = window.confirm('¿Estas seguro de borrar el cliente?');
        if (resultado){
            axios.delete("http://localhost:8080/borrarCliente/" + id)
            .then(res=>{
                this.setState({
                    status:"deleted"
                });
    
                window.location.reload(true);
            })
        }

    }


    render(){
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
                 <h1> Clientes</h1>
                 <Link to = "/agregarCliente">Agregar Producto</Link>
                    <table>
                        <thead>
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Correo Electrónico</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clientes.map(
                                    cliente =>
                                    <tr key = {cliente.cedulaCliente}>
                                        <td> {cliente.cedulaCliente}</td>
                                        <td> {cliente.nombreCliente}</td>
                                        <td> {cliente.direccionCliente}</td>
                                        <td> {cliente.telefonoCliente}</td>
                                        <td> {cliente.emailCliente}</td>
                                        <td>
                                                <button> Editar</button>
                                                <button onClick = {()=>{ this.borrarCliente(cliente.cedulaCliente)}}> Eliminar</button>
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

export default Clientes;