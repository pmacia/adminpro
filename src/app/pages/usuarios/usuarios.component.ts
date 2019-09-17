import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public usuariosService: UsuarioService,
    public modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
      .subscribe( resp => {
        this.cargarUsuarios();
    });
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuariosService.cargarUsuarios( this.desde )
      .subscribe( ( resp: any ) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
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
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {
    if ((!termino) || (termino.length < 3 )) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuariosService.buscarUsuarios( termino )
    .subscribe( (usuarios: Usuario[] ) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ) {
    console.log( usuario );
    // Si no somos nosotros mismos (usuario autenticado )
    if ( usuario._id === this.usuariosService.usuario._id) {
      Swal.fire(
        'No se puede borrar el usuario',
        'No se puede eliminar el usuario actualmente autenticado',
        'error'
      );
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `Está a punto de eliminar al usuario: ${usuario.nombre}. El borrado es irreversible`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡ Sí, elimínelo !',
      cancelButtonText: '¡ No, cancele !',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuariosService.borrarUsuario( usuario._id )
          .subscribe( resp => {
            console.log( resp );
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              `El usuario ${usuario.nombre} ha sido eliminado.`,
              'success'
            );
            this.cargarUsuarios();
          }, (e => {
            console.log( e );
            swalWithBootstrapButtons.fire(
              '¡Error eliminado!',
              `El usuario ${usuario.nombre} no ha podido ser eliminado.`,
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
          `El usuario ${usuario.nombre} sigue estando en su sistema.`,
          'error'
        );
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {

    // if ( usuario._id === this.usuariosService.usuario._id) {
    //   Swal.fire(
    //     'No se puede modificar la información del usuario',
    //     'No se puede modificar la información del usuario actualmente autenticado',
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
      text: `Está a punto de modificar la información del usuario: ${usuario.nombre}. El cambio es irreversible`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡ Sí, modifíquelo !',
      cancelButtonText: '¡ No, cancele !',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuariosService.actualizarUsuario( usuario )
          .subscribe( resp => {
            swalWithBootstrapButtons.fire(
              '¡Modificado!',
              `Se ha modificado la información del usuario ${usuario.nombre}.`,
              'success'
            );
            this.cargarUsuarios();
          }, (err => {
            swalWithBootstrapButtons.fire(
              `¡Error modificando usuario ${usuario.nombre}!`,
              err,
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
          `No se ha modificado la información del usuario ${usuario.nombre}.`,
          'error'
        );
      }
    });
  }


}
