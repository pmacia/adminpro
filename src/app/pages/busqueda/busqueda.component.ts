import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];


  constructor(
    public activateRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router
  ) {
    activateRoute.params
      .subscribe( params => {
        const termino: string = params.termino;
        this.buscar( termino );
      });
  }

  ngOnInit() {
  }

  buscar( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;
    this.http.get( url )
      .subscribe( (resp: any) => {
        console.log ( resp );
        this.usuarios = resp.usuarios;
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
      });
  }

  irA( tipo: string, id: string ) {
    console.log(tipo);
    console.log(id);

    if ( id !== '' ) {
      this.router.navigate([tipo, id]);
    } else {
      this.router.navigate([tipo]);
    }

  }

}
