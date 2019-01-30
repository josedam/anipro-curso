import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Medico } from '../../models/medico.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {}

  cargarMedicos(desde: number = 0, porPag: number = 9999) {
    const url = URL_SERVICIOS + '/medico' + '?desde=' + desde + '&porPag=' + porPag;
    return this.http.get(url);
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }

  obtenerMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medico)
    );
  }
 
  guardarMedico(medico: Medico) {
    if (medico._id) {
      return this.actualizarMedico(medico);
    } else {
      return this.crearMedico(medico);
    }
  }

  crearMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico' + '?token=' + this._usuarioService.token;
    return this.http.post(url, medico);
  }

  actualizarMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this._usuarioService.token;
    return this.http.put(url, medico);
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medico)
    );
  }
}
