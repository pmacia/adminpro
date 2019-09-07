import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function inicializarPlugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  public recuerdame: boolean = false;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    inicializarPlugins();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  entrar( form: NgForm) {

    if (form.invalid) {
      return;
    }

    const usuario = new Usuario( null, form.value.email, form.value.password );
    this.usuarioService.login( usuario, form.value.recuerdame)
      .subscribe( correcto => this.router.navigate(['/dashboard']));

    console.log( form.valid);
    console.log( form.value);
  }
}
