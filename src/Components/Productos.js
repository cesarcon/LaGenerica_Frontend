import React from "react";
import { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class Productos extends Component{
    state = {
        productos:[],
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
        this.getProductos();
    }

    getProductos = () =>{
        axios.get("http://localhost:8080/todosLosProductos")
           .then(res => {
               console.log(res.data);
               this.setState({
                   productos:res.data
               })
           });
    }

    borrarProducto = (id) =>{
        var resultado = window.confirm('¿Estas seguro de borrar el producto?');
        if (resultado){
            axios.delete("http://localhost:8080/borrar/" + id)
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
             
             <h1> Productos</h1>
             <Link to = "/agregarProducto">Agregar Producto</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Código del producto</th>
                            <th>Nombre del producto</th>
                            <th>NIT del proveedor</th>
                            <th>Precio de compra</th>
                            <th>IVA</th>
                            <th>Precio de venta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.productos.map(
                                producto =>
                                <tr key = {producto.codigoProducto}>
                                    <td> {producto.codigoProducto}</td>
                                    <td> {producto.nombreProducto}</td>
                                    <td> {producto.nitproveedor}</td>
                                    <td> {producto.precioCompra}</td>
                                    <td> {producto.ivacompra}</td>
                                    <td> {producto.precioVenta}</td>
                                    <td>
                                         <button> Editar</button>
                                         <button onClick = {()=>{ this.borrarProducto(producto.codigoProducto)}}> Eliminar</button>
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

export default Productos;