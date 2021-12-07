import React from "react";
import { Component } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class AgregarProducto extends Component{
    codigo = React.createRef();
    producto = React.createRef();
    nit = React.createRef();
    precioCompra = React.createRef();
    iva = React.createRef();
    precioVenta = React.createRef();

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

    guardarProducto = (e) =>{
        e.preventDefault();
        var producto = {
            codigoProducto:this.codigo.current.value,
            nombreProducto:this.producto.current.value,
            nitproveedor:this.nit.current.value,
            precioCompra:this.precioCompra.current.value,
            ivacompra:this.iva.current.value,
            precioVenta:this.precioVenta.current.value,
        }

        axios.post("http://localhost:8080/addproducto", producto)
           .then(res=>{
               this.setState({
                   status:"success"
               })
            });
    }

    render(){
        if(this.state.status === "success"){
            return<Navigate to ="/productos" />
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
                <h1>Agregar Producto</h1>
                <form onSubmit = {this.guardarProducto}>
               
                    <div>
                        <label> Código del producto</label>
                        <input type = "text" name = "codigo" ref={this.codigo}/>
                    </div>
                    <div>
                        <label> Producto</label>
                        <input type = "text" name = "producto" ref={this.producto}/>
                    </div>
                    <div>
                        <label> NIT</label>
                        <input type = "text" name = "nit" ref={this.nit}/>
                    </div>
                    <div>
                        <label> Precio de compra</label>
                        <input type = "text" name = "precioCompra" ref={this.precioCompra}/>
                    </div>
                    <div>
                        <label> IVA</label>
                        <input type = "text" name = "iva" ref={this.iva}/>
                    </div>
                    <div>
                        <label> Precio de venta</label>
                        <input type = "text" name = "precioVenta" ref={this.precioVenta}/>
                    </div>
                    <div>
                     <input type = "submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AgregarProducto;