import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres()
    .then(
      mensaje => console.log('Ok', mensaje)
    )
    .catch(
      error => console.error('Error en la promesa', error
    ));

  }

  contarTres(): Promise<boolean> {
    return new Promise<boolean> ( (resolve, reject) => {
      let contador = 0;

      const intervalo = setInterval( () => {
        contador++;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          // reject('llegó mal a 3');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

  ngOnInit() {
  }

}
