import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion
      .subscribe( resp => {
        this.cargarHospitales();
    });
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal( 'hospitales', id );
  }

  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargarHospitales( this.desde )
      .subscribe( ( resp: any ) => {
        this.hospitales = resp;
        this.totalRegistros = this.hospitalService.totalHospitales;
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
    this.cargarHospitales();

  }

  buscarHospital( termino: string ) {
    if ((!termino) || (termino.length < 3 )) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospitales( termino )
    .subscribe( (hospitales: Hospital[] ) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  borrarHospital( hospital: Hospital ) {
    console.log( hospital );
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `Está a punto de eliminar el hospital: ${hospital.nombre}. El borrado es irreversible`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡ Sí, elimínelo !',
      cancelButtonText: '¡ No, cancele !',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospital( hospital._id )
          .subscribe( resp => {
            console.log( resp );
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              `El hospital ${hospital.nombre} ha sido eliminado.`,
              'success'
            );
            this.cargarHospitales();
          }, (e => {
            console.log( e );
            swalWithBootstrapButtons.fire(
              '¡Error eliminado!',
              `El hospital ${hospital.nombre} no ha podido ser eliminado.`,
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
          `El hospital ${hospital.nombre} sigue estando en su sistema.`,
          'error'
        );
      }
    });
  }

  guardarHospital( hospital: Hospital ) {

    // if ( hospital._id === this.hospitalService.hospital._id) {
    //   Swal.fire(
    //     'No se puede modificar la información del hospital',
    //     'No se puede modificar la información del hospital actualmente autenticado',
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
      text: `Está a punto de modificar la información del hospital: ${hospital.nombre}. El cambio es irreversible`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡ Sí, modifíquelo !',
      cancelButtonText: '¡ No, cancele !',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.hospitalService.actualizarHospital( hospital )
          .subscribe( resp => {
            console.log( resp );
            swalWithBootstrapButtons.fire(
              '¡Modificado!',
              `Se ha modificado la información del hospital ${hospital.nombre}.`,
              'success'
            );
            this.cargarHospitales();
          }, (e => {
            console.log( e );
            swalWithBootstrapButtons.fire(
              '¡Error modificando!',
              `La información del hospital ${hospital.nombre} no ha podido ser modificada.`,
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
          `No se ha modificado la información del hospital ${hospital.nombre}.`,
          'error'
        );
      }
    });
  }

  async crearHospital( hospital: Hospital ) {
    console.log(`Creando el hospital: ${hospital}`);

    const { value: nombre } = await Swal.fire({
      title: 'Introduzca el nombre del nuevo hospital',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe introducir un nombre para el nuevo hospital';
        }
      }
    });

    if (nombre) {
      const nuevoHospital: Hospital = new Hospital( nombre );

      this.hospitalService.crearHospital( nuevoHospital )
        .subscribe( resp => {
          console.log( resp );
          this.cargarHospitales();
          Swal.fire(`Se ha creado un nuevo hospital llamado: ${nombre}`);
        }, ( e => {
          Swal.fire(
            '¡Error creando hospital!',
            `No se ha podido crear el hospital ${nombre}.`,
            'error'
          );
        }));
    }
  }


  
}
