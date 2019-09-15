import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    public medicoService: MedicoService,
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;

    this.medicoService.cargarMedicos( this.desde )
      .subscribe( ( resp: any ) => {
        console.log( resp );
        this.medicos = resp;
        this.totalRegistros = this.medicoService.totalMedicos;
        this.cargando = false;
      });
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    console.log( desde );

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();

  }

  buscarMedico( termino: string ) {
    if ((!termino) || (termino.length < 3 )) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this.medicoService.buscarMedicos( termino )
    .subscribe( (medicos: Medico[] ) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  borrarMedico( medico: Medico ) {
    console.log( medico );
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `Está a punto de eliminar el medico: ${medico.nombre}. El borrado es irreversible`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡ Sí, elimínelo !',
      cancelButtonText: '¡ No, cancele !',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico( medico._id )
          .subscribe( resp => {
            console.log( resp );
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              `El medico ${medico.nombre} ha sido eliminado.`,
              'success'
            );
            this.cargarMedicos();
          }, (e => {
            console.log( e );
            swalWithBootstrapButtons.fire(
              '¡Error eliminado!',
              `El medico ${medico.nombre} no ha podido ser eliminado.`,
              'error'
            );
          })
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelada la eliminación',
          `El medico ${medico.nombre} sigue estando en su sistema.`,
          'error'
        );
      }
    });
  }

  guardarMedico( medico: Medico ) {

    // if ( medico._id === this.medicoService.medico._id) {
    //   Swal.fire(
    //     'No se puede modificar la información del medico',
    //     'No se puede modificar la información del medico actualmente autenticado',
    //     'error'
    //   );
    //   return;
    // }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `Está a punto de modificar la información del medico: ${medico.nombre}. El cambio es irreversible`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡ Sí, modifíquelo !',
      cancelButtonText: '¡ No, cancele !',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.medicoService.actualizarMedico( medico )
          .subscribe( resp => {
            console.log( resp );
            swalWithBootstrapButtons.fire(
              '¡Modificado!',
              `Se ha modificado la información del medico ${medico.nombre}.`,
              'success'
            );
            this.cargarMedicos();
          }, (e => {
            console.log( e );
            swalWithBootstrapButtons.fire(
              '¡Error modificando!',
              `La información del medico ${medico.nombre} no ha podido ser modificada.`,
              'error'
            );
          })
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelada la actualización',
          `No se ha modificado la información del medico ${medico.nombre}.`,
          'error'
        );
      }
    });
  }

}
