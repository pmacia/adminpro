import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class UsuarioService {

  public usuario: Usuario;
  public token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
    console.log('Servicio de usuario listo');
  }

  estaAutenticado() {
    return ( this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    //localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${URL_SERVICIOS}/login`;
    console.log(url);

    return this.http.post<any>( url, usuario)
      .pipe( map( resp => {
        this.guardarStorage( resp.id, resp.token, resp.usuario );
        return true;
      })
    );
  }


  loginGoogle( token: string ) {
    const URL = `${URL_SERVICIOS}/login/google`;

    return this.http.post<any>( URL, { token } )
      .pipe ( map ( resp => {
        this.guardarStorage( resp.id, resp.token, resp.usuario );
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
}
