import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
  ) {}

  canActivate() {

    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
        return true;
      } else {
        console.log('Rechazado por el ADMIN GUARD');
        this.usuarioService.logout();
        return false;
      }

    return true;
  }
}
