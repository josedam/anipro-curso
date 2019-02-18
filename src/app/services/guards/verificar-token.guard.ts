import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class VerificarTokenGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (this.isTokenExpirado(payload.exp)) {
      this.router.navigate(['/login']);
      return false; // no ingresa
    }

    return this.VerificarRenovarToken(payload.exp);

  }

  VerificarRenovarToken(fechaExpSegundos: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.isTokenExpirado(fechaExpSegundos, 45)) {
        resolve(true);
      } else {
        this.usuarioService.renovarToken()
          .subscribe(
            () => {
              resolve(true);
            },
            () => {
              reject(false);
            });
      }
    });
  }

  isTokenExpirado(fechaExpSegundos: number, limiteMinutos: number = 0) {
    const fechaToken = new Date(fechaExpSegundos * 1000);
    const fechaLimite = new Date();
    fechaLimite.setTime(fechaLimite.getTime() + limiteMinutos * 60 * 1000); // en minutos 
    return fechaToken.getTime() < fechaLimite.getTime();
  }
}
