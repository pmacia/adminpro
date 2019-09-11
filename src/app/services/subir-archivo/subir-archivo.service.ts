import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {
    return new Promise( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      // Definir los hooks para cuando termine o pase algo con la llamada AJAX
      xhr.onreadystatechange = () => {
        // Si el proceso ha finalizado
        if (xhr.readyState === 4 ) {
          // Si todo ha ido bien
          if (xhr.status === 200 ) {
            console.log( ' Imagen subida ');
            resolve( JSON.parse(xhr.response) );
          } else {
            console.log( ' Fallo en la subida ');
            reject( xhr.response );
          }
        }
      };

      // Realizamos la llamada AJAX
      const url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;
      formData.append( 'imagen', archivo, archivo.name );
      xhr.open('PUT', url, true );
      xhr.send( formData );

    });
  }

}
