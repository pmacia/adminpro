import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];

  medico: Medico = new Medico('', '', null, '');
  hospital: Hospital = new Hospital('');

  imagenASubir: File;
  imagenTemp: string;

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activateRoute.params.subscribe( params => {
      console.log(params);
      const id = params.id;
      console.log(id);
      if (id !== 'nuevo') {
        this.cargarMedico( id );
      }
    });
  }

  ngOnInit() {
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => this.hospitales = hospitales );

    this.modalUploadService.notificacion
      .subscribe( resp => {
        console.log( resp );
        this.medico.img = resp.medico.img;
      });
  }

  guardarMedico( formData: NgForm ) {

    if (formData.invalid) {
      return;
    }

    const msg: string = this.medico._id ? 'actualizado' : 'creado';

    this.medicoService.guardarMedico( this.medico )
      .subscribe( medico => {
        Swal.fire(
          `Médico ${msg}`,
          `Se ha ${msg} el médico ${medico.nombre}`,
          'success');
        this.medico = medico;
        this.router.navigate(['/medico', medico._id ]);
      });
  }

  cargarMedico( id: string ) {
    this.medicoService.cargarMedico( id )
      .subscribe( ( medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.medico.usuario = medico.usuario._id;
        this.cambioHospital( this.medico.hospital );
      }));
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenASubir = null;
      return;
    }

    this.imagenASubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result.toString();
    };
  }

  cambiarImagen( ) {
    this.medicoService.cambiarImagen( this.imagenASubir, this.medico._id );
  }

  cambioHospital( id: string ) {
    console.log( id );
    this.hospitalService.obtenerHospital( id )
      .subscribe( hospital => this.hospital = hospital);
  }

  cambiarFoto( ) {
    this.modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }
}
