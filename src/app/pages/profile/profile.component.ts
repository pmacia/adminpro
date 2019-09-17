import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenASubir: File;
  imagenTemp: string;

  constructor(
    public usuarioService: UsuarioService,
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( formData: any ) {
    this.usuario.nombre = formData.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = formData.email;
    }

    this.usuarioService.actualizarUsuario( this.usuario )
    .subscribe(
      usuario => Swal.fire('Usuario actualizado', usuario.nombre, 'success'),
      err => Swal.fire('Importante', err, 'error')
    );
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
    this.usuarioService.cambiarImagen( this.imagenASubir, this.usuario._id );
  }

}
