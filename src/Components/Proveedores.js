import React from "react";
import { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const cookies = new Cookies();

class Proveedores extends Component{
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

    componentWillMount(){
        this.getProveedores();
    }

    getProveedores = () =>{
        axios.get("http://localhost:8080/consultarProveedores")
           .then(res => {
               console.log(res.data);
               this.setState({
                   proveedores:res.data
               })
           });
    }

    borrarProveedor = (id) =>{

        var resultado = window.confirm('¿Estas seguro de borrar el producto?');
        if (resultado){
            axios.delete("http://localhost:8080//borrarProveedor/" + id)
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
             <h1> Proveedores</h1>
             <Link to = "/agregarProveedor">Agregar Producto</Link>
                <table>
                    <thead>
                        <tr>
                            <th>NIT del proveedor</th>
                            <th>Nombre del proveedor</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Ciudad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.proveedores.map(
                            proveedor =>
                            <tr key = {proveedor.nitproveedor}>
                                             <td> {proveedor.nitproveedor}</td>
                                             <td> {proveedor.nombreProveedor}</td>
                                             <td> {proveedor.direccionProveedor}</td>
                                             <td> {proveedor.telefonoProveedor}</td>
                                             <td> {proveedor.ciudadProveedor}</td>
                                             <td>
                                                 <button> Editar</button>
                                                 <button onClick = {()=>{ this.borrarProveedor(proveedor.nitproveedor)}}> Eliminar</button>
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

export default Proveedores;