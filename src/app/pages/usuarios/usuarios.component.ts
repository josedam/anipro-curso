import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from 'src/app/services/services.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {
      this.asignarUsuarios(resp.usuarios, resp.total);
      // this.totalRegistros = resp.total;
      // this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  private asignarUsuarios(usuarios: Usuario[], total: number) {
    this.usuarios = usuarios;
    this.totalRegistros = total;
  }

  cambiarDesde(valor: number) {
    const nuevo  = this.desde + valor;
    if ((nuevo < 0) || (nuevo > this.totalRegistros)) {
      return;
    }
    this.desde = nuevo;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();

    } else {
      this.usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.asignarUsuarios(usuarios, usuarios.length);
        // this.usuarios = usuarios;
      });

    }
  }

borrarUsuario(usuario: Usuario) {
  if (usuario._id === this.usuarioService.usuario._id) {
    swal('No se puede Borrar', 'Imposible borrarse a si mismo', 'error');
    return;
  }
  swal({
    title: 'Esta Seguro..?',
    text: 'Esta a punto de borrar el usuario ' + usuario.nombre,
    icon: 'warning',
    buttons: ['Cancelar', 'Borrar'],
    dangerMode: true,
  })
  .then((puedeBorrar) => {
    if (puedeBorrar) {
      this.usuarioService.borrarUsuario(usuario._id)
        .subscribe(usuarioBorrado => {
          this.cargarUsuarios();
          swal('Usuario Borrado', {
            icon: 'success',
          });
        });
    }
  });
}

guardarUsuario(usuario: Usuario) {
  this.usuarioService.actualizarUsuario(usuario)
    .subscribe();
}

mostrarModal(id: string) {
  this._modalUploadService.mostrarModal('usuario', id);
}

}
