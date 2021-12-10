import React from "react";
import { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

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
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="navbar-brand">Tiendas la Genérica - Sucursal {cookies.get('ciudad')} | Usuarios</li>
                            <li class="nav-item active">
                                <a class="nav-link Productos" href="/productos">Productos <span class="sr-only"></span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link Proveedores" href="/proveedores">Proveedores</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link Clientes" href="/clientes">Clientes</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link Usuarios" href="/usuarios">Usuarios</a>
                            </li>
                            <li class="nav-item">
                         <a class="nav-link Usuarios" href="/ventas">Ventas</a>
                      </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0" class="btn-group" role="group">
                            <a class="btn btn-outline-success" href="/agregarUsuario" role="button"> Agregar Usuario</a>
                            <button class="btn btn-outline-danger my-2 my-sm-0" onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                        </form>
                    </div>
                </nav>
                <table className="table table-hover table-sm">
                <thead class="table-dark">
                        <tr>
                            <th>Cédula del Usuario</th>
                            <th>Correo</th>
                            <th>Nombre</th>
                            <th>Password</th>
                            <th>Usuario</th>
                            <th>Ciudad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usuarios.map(
                            usuario => <tr key={usuario.cedulaUsuario}>
                                <td> {usuario.cedulaUsuario}</td>
                                <td> {usuario.emailUsuario}</td>
                                <td> {usuario.nombreUsuario}</td>
                                <td> {usuario.password}</td>
                                <td> {usuario.usuario}</td>
                                <td> {usuario.ciudad}</td>
                                <td>
                                    <div class="btn-group" role="group" >
                                    <a class="btn btn-outline-info" href={"/EditarUsuario/"+ usuario.cedulaUsuario}
                                          role="button"  > Editar</a>
                                    <button type="button" class="btn btn-outline-danger" onClick={() => { this.borrarUsuario(usuario.cedulaUsuario); } }> Eliminar</button>
                                </div>
                                </td>
                            </tr>

                        )}


                    </tbody>
                </table>
            </div>      
        );
    }
}

export default Usuarios;