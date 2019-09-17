import { Component, OnInit } from '@angular/core';

declare function inicializarPlugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: [ './nopagefound.component.css' ]
})
export class NopagefoundComponent implements OnInit {

  public anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    inicializarPlugins();
  }

}
