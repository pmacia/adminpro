import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

//  oculto: string; // Esta propiedad la manejamos desde el servicio...
  imagenASubir: File;
  imagenTemp: string;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {
    console.log('Modal listo');
   }

  ngOnInit() {
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

  subirImagen() {
    this.subirArchivoService.subirArchivo( this.imagenASubir, this.modalUploadService.tipo, this.modalUploadService.id )
      .then( resp => {
        this.modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
      }, (e => {
        console.log('reject en la carga de imagen sin tratar...');
      }))
      .catch( err => {
        console.log('catch en la carga de imagen sin tratar...');
      });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenASubir = null;

    this.modalUploadService.ocultarModal();
  }
}
