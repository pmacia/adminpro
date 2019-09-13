import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate() {
    if (this.usuarioService.estaAutenticado() ) {
      return true;
    }

    console.log(' Bloqueado por el Login Guard');
    this.router.navigate(['/login']);
    return false;
  }

}
