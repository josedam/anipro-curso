import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    const rutasValidas = ['usuario', 'hospital', 'medico'];
    let url = URL_SERVICIOS + '/imagen';

    if (!img) {
      url += '/usuario/xxx';
  
    } else if (img.indexOf('google') > -1) {
      url = img;

    } else if (rutasValidas.indexOf(tipo) < 0) {
      console.log('ruta Img Incorrecta. Valores permitidos ' + rutasValidas.toString());
      url += '/usuario/xxx';

    } else {
      url += '/' + tipo + '/' + img;
    }

    return url;
  }

}
