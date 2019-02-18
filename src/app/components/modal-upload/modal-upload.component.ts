import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/services.index';
import { ModalUploadService } from 'src/app/services/services.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenUrl: string;

  constructor(
    private _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
    ) {}

  ngOnInit() {
  }

  ocultarModal() {
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(
        this.imagenSubir,
        this._modalUploadService.tipo,
        this._modalUploadService.id)
      .then(resp => {
        this._modalUploadService.notificacion.emit(resp);
        this.ocultarModal();
      })
      .catch(err => {
        console.log('Error al subir imagen');
      });
  }

  seleccionaImagen( archivo: File ) {
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
    } else {
      this.imagenSubir = archivo;

      const reader = new  FileReader();
      reader.readAsDataURL(archivo);
      reader.onloadend = () => this.imagenUrl = String(reader.result);
    }
  }
}
