import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class HospitalService {

  public totalHospitales: number;

  public hospital: Hospital;
  // public token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public usuarioService: UsuarioService,
    public subirArchivoService: SubirArchivoService
  ) {
    // this.token = this.usuarioService.token;
  }

  // estaAutenticado() {
  //   return ( this.token.length > 5) ? true : false;
  // }

  // cargarStorage() {
  //   if (localStorage.getItem('token')) {
  //     this.token = localStorage.getItem('token');
  //     this.hospital = JSON.parse(localStorage.getItem('hospital'));
  //   } else {
  //     this.token = '';
  //     this.hospital = null;
  //   }
  // }

  // guardarStorage( id: string, token: string, hospital: Hospital) {
  //   localStorage.setItem( 'id', id );
  //   localStorage.setItem( 'token', token );
  //   localStorage.setItem( 'hospital', JSON.stringify(hospital) );

  //   this.hospital = hospital;
  //   this.token = token;
  // }

  // logout() {
  //   this.token = '';
  //   this.hospital = null;

  //   localStorage.removeItem('token');
  //   localStorage.removeItem('hospital');
  //   //localStorage.removeItem('id');

  //   this.router.navigate(['/login']);
  // }

  // login( hospital: Hospital, recordar: boolean = false ) {

  //   if (recordar) {
  //     localStorage.setItem('email', hospital.email);
  //   } else {
  //     localStorage.removeItem('email');
  //   }

  //   const url = `${URL_SERVICIOS}/login`;
  //   console.log(url);

  //   return this.http.post<any>( url, hospital)
  //     .pipe( map( resp => {
  //       this.guardarStorage( resp.id, resp.token, resp.hospital );
  //       return true;
  //     })
  //   );
  // }


  // loginGoogle( token: string ) {
  //   const URL = `${URL_SERVICIOS}/login/google`;

  //   return this.http.post<any>( URL, { token } )
  //     .pipe ( map ( resp => {
  //       this.guardarStorage( resp.id, resp.token, resp.hospital );
  //       return true;
  //     }));
  // }


  crearHospital( hospital: Hospital ) {
    const url = `${URL_SERVICIOS}/hospital?token=${this.usuarioService.token}`;
    console.log(url);

    return this.http.post<any>( url, hospital)
      .pipe( map( resp => {
        // Swal.fire('Hospital creado', hospital.email, 'success');
        return resp.hospital;
      })
    );
  }

  actualizarHospital( hospital: Hospital ) {
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this.usuarioService.token}`;

    return this.http.put<any>( url, hospital )
      .pipe( map( resp => resp.hospital ));
  }

  cambiarImagen( archivo: File, id: string ) {
    this.subirArchivoService.subirArchivo( archivo, 'hospitales', id )
      .then( (resp: any) => {
        this.hospital.img = resp.hospital.img;
        Swal.fire('Imagen actualizada', resp.hospital.nombre, 'success');
        console.log( resp );
      })
      .catch( resp => {
        console.log( resp );
      });
  }

  cargarHospitales( desde: number = 0 ) {
    const url = `${URL_SERVICIOS}/hospital?desde=${desde}`;
    return this.http.get( url )
      .pipe( map( (resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      }));
  }

  buscarHospitales( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get( url )
      .pipe( map ( (resp: any) => resp.hospitales ));
  }

  borrarHospital( id: string ) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.usuarioService.token}`;

    return this.http.delete( url )
      .pipe( map ( resp => resp ));
  }

  // guardarHospital( id: string, hospital: Hospital ) {
  //   const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.token}`;
  //   const body = hospital;

  //   console.log ( body );

  //   return this.http.put( url, body )
  //     .pipe( map ( resp => resp ));
  // }

  obtenerHospital( id: string ) {
    const url = `${URL_SERVICIOS}/hospital/${id}`;

    return this.http.get( url )
      .pipe( map ( (resp: any) => resp.hospital ));
  }
}
