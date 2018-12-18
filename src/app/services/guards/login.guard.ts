import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) {

};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.usuarioService.estaLogeado()) {
        console.log('Aceptado...');
        return true;
      } else {
        console.log('Login Rechazado...');
        this.router.navigate(['/login']);
        return false;
      }
  }
}
