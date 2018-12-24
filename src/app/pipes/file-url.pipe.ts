import { Pipe, PipeTransform } from '@angular/core';
import { promise } from 'protractor';

@Pipe({
  name: 'fileUrl'
})
export class FileUrlPipe implements PipeTransform {
 
  transform(archivo: File): any {
    this.waitReader(archivo)
      .then(resp => {
        console.log(resp);
        return resp;
      });
  }

  private waitReader(archivo: File) {
    return new Promise ((resolve, reject) => {
      const reader = new  FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      const urlTemp = reader.readAsDataURL(archivo);
    });
  }
}
