import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class MedicoService {

  public totalMedicos: number;

  public medico: Medico;

  constructor(
    public http: HttpClient,
    public router: Router,
    public usuarioService: UsuarioService,
    public subirArchivoService: SubirArchivoService
  ) {
    // this.token = this.usuarioService.token;
  }

  guardarMedico( medico: Medico ) {

    console.log ('guardarMedico');
    console.log (medico);

    if ( medico._id ) {
      return this.actualizarMedico( medico );
    } else {
      return this.crearMedico( medico );
    }

  }


  crearMedico( medico: Medico ) {
    const url = `${URL_SERVICIOS}/medico?token=${this.usuarioService.token}`;
    console.log(url);

    return this.http.post<any>( url, medico)
      .pipe( map( resp => {
        // Swal.fire('Medico creado', medico.email, 'success');
        return resp.medico;
      })
    );
  }

  actualizarMedico( medico: Medico ) {
    const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this.usuarioService.token}`;

    return this.http.put<any>( url, medico )
      .pipe( map( resp => resp.medico ));
  }

  cambiarImagen( archivo: File, id: string ) {
    this.subirArchivoService.subirArchivo( archivo, 'medicos', id )
      .then( (resp: any) => {
        this.medico.img = resp.medico.img;
        Swal.fire('Imagen actualizada', resp.medico.nombre, 'success');
        console.log( resp );
      })
      .catch( resp => {
        console.log( resp );
      });
  }

  cargarMedicos( desde: number = 0 ) {
    const url = `${URL_SERVICIOS}/medico?desde=${desde}`;
    return this.http.get( url )
      .pipe( map( (resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      }));
  }

  cargarMedico( id: string ) {
    const url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get( url )
      .pipe( map( (resp: any) => resp.medico));
  }

  buscarMedicos( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get( url )
      .pipe( map ( (resp: any) => resp.medicos ));
  }

  borrarMedico( id: string ) {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this.usuarioService.token}`;

    return this.http.delete( url )
      .pipe( map ( resp => resp ));
  }

  obtenerMedico( id: string ) {
    const url = `${URL_SERVICIOS}/medico/${id}`;

    return this.http.get( url )
      .pipe( map ( (resp: any) => resp.medico ));
  }

}
