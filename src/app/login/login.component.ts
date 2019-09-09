import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function inicializarPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public recuerdame: boolean = false;
  public auth2: any;

  constructor(
    public router: Router,
    private ngZone: NgZone,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    inicializarPlugins();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }

    this.googleInit();
  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '439463715826-88vpk0n5qkvq5hthn18fg8q72ejn6386.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }


  attachSignin( element ) {
    console.log ('attachSignin:', element);
    this.auth2.attachClickHandler( element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      // console.log(profile);

      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle( token )
        // .subscribe ( res => this.ngZone.run(() => this.router.navigate(['/dashboard'])));
        .subscribe ( () => window.location.href = '#/dashboard' );
    });
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
