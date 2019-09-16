import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable()
export class UsuarioService {

  public usuario: Usuario;
  public token: string;
  public menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaAutenticado() {
    return ( this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );
    localStorage.setItem( 'menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    this.menu = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    // localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${URL_SERVICIOS}/login`;

    return this.http.post<any>( url, usuario)
      .pipe( map( resp => {
        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
        return true;
      })
    );
  }


  loginGoogle( token: string ) {
    const URL = `${URL_SERVICIOS}/login/google`;

    return this.http.post<any>( URL, { token } )
      .pipe ( map ( resp => {
        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
        return true;
      }));
  }


  crearUsuario( usuario: Usuario ) {
    const url = `${URL_SERVICIOS}/usuario`;
    console.log(url);

    return this.http.post<any>( url, usuario)
      .pipe( map( resp => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }

  actualizarUsuario( usuario: Usuario ) {
    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;

    return this.http.put<any>( url, usuario )
      .pipe( map( resp => {
        if ( usuario._id === this.usuario._id ) {
          this.guardarStorage( resp.usuario._id, this.token, resp.usuario, resp.menu );
          Swal.fire('Usuario actualizado', usuario.nombre, 'success');
        }
        return true;
      })
    );
  }

  cambiarImagen( archivo: File, id: string ) {
    this.subirArchivoService.subirArchivo( archivo, 'usuarios', id )
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen actualizada', resp.usuario.nombre, 'success');
        this.guardarStorage( id, this.token, this.usuario, this.menu );
        console.log( resp );
      })
      .catch( resp => {
        console.log( resp );
      });
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get( url )
      .pipe( map ( (resp: any) => resp.usuarios ));
  }

  borrarUsuario( id: string ) {
    const url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;

    return this.http.delete( url )
      .pipe( map ( resp => resp ));
  }

  // guardarUsuario( id: string, usuario: Usuario ) {
  //   const url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
  //   const body = usuario;

  //   console.log ( body );

  //   return this.http.put( url, body )
  //     .pipe( map ( resp => resp ));
  // }

}
