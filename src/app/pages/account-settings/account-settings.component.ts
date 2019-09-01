import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document: Document,
               public servicioAjustes: SettingsService ) {}

  ngOnInit() {
    this.ubicarSelectorPorDefecto();
  }

  cambiarTema( tema: string, ubicacion: any ) {
    this.ubicarSelector( ubicacion );
    this.servicioAjustes.aplicarTema( tema );
  }

  ubicarSelector( ubicacion: any) {
    const ubicaciones: any = document.getElementsByClassName('selector');

    for ( const refUbicacion of ubicaciones) {
      refUbicacion.classList.remove('working');
    }

    ubicacion.classList.add('working');
  }

  ubicarSelectorPorDefecto() {
    const ubicaciones: any = document.getElementsByClassName('selector');
    const tema = this.servicioAjustes.ajustes.tema;

    for ( const refUbicacion of ubicaciones) {
      if (refUbicacion.getAttribute('data-theme') === tema ) {
        refUbicacion.classList.add('working');
        break;
      }
    }
  }

}
