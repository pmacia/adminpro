import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress', {static: true}) txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioEnValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onChange( newValue: number) {
    console.log('progress:1', this.progreso);
    if (newValue > 100) {
      this.progreso = 100;
    } else if (newValue < 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioEnValor.emit(this.progreso);
    console.log('progreso2: ', this.progreso);
  }

  cambiarValor( valor: number ) {
    if ((valor > 0) && (this.progreso >= 100)) {
      this.progreso = 100;
      return;
    }

    if ((valor < 0) && (this.progreso  <= 0)) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;
    this.cambioEnValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

}
