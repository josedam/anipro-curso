import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/services.index';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styles: []
})
export class SiderbarComponent implements OnInit {
  usuario: Usuario;

  constructor(
    public _sidebar: SidebarService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this._sidebar.cargarMenu();
  }

}
