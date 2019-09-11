import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario' ): any {

    let url = `${URL_SERVICIOS}/img`;

    if (!img) {
      return url + '/usuarios/xxx';
    }

    // Esta comprobación habría que mejorarla para saber si la imagen es de Google
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
      console.log('Tipo de imagen desconocida: usuario, medico, hospital.');
      return url + '/usuarios/xxx';
    }

    console.log(url);
    return url;
  }

}
