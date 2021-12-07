import React from "react";
import { Component } from "react";
import Cookies from "universal-cookie/es6";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class Menu extends Component {

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
             
             <h1> Menú Principal</h1>
             </div>
             )
             }

}

export default Menu;