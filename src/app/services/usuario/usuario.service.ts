import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('Servicio de usuario listo');
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
        localStorage.setItem( 'id', resp.id );
        localStorage.setItem( 'token', resp.token );
        localStorage.setItem( 'usuario', JSON.stringify(resp.usuario) );

        return true;
      })
    );
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
