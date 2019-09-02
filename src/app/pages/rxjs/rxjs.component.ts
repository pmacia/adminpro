import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.myObservable().subscribe(
      numero => console.log('Subs: ', numero),
      error => console.error('Error en obs:', error),
      () => console.log('El observador terminó')
    );

  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  myObservable(): Observable<any> {
    return new Observable<any>( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if (contador === 5) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // Para probar el retry()
        // if (contador === 2) {
        //   // clearInterval( intervalo );
        //   observer.error('Socorro');
        // }

      }, 1000 );

    }).pipe(
      //  retry(3),
      //  map( resp => resp.valor ),
        map( resp => {
          return resp.valor;
        }),
        filter( (valor, index) => {
          if ( (valor % 2) === 1 ) {
            return true;  // devolvemos solo los impares
          } else {
            return false; // no devolvemos el valor. Lo filtramos
          }
        })
    );
  }


}
