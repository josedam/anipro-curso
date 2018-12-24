import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenUrl: string;

  constructor(
    private usuarioService: UsuarioService;
  ) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( f ) {
    this.usuario.nombre = f.nombre;
    if (!this.usuario.google) {
      this.usuario.email = f.email; // no debe modificar email de google..
    }
    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
  }

  seleccionaImagen( archivo: File ) {
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
    } else {
      this.imagenSubir = archivo;

      const reader = new  FileReader();
      reader.onloadend = () => this.imagenUrl = reader.result;
      const urlTemp = reader.readAsDataURL(archivo);
    }
  }

  actualizarImagen() {
    this.usuarioService.actualizarImagen(this.imagenSubir, this.usuario._id);
  }
}
