import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from 'src/app/config/config';

import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {}


  cargarHospitales(desde: number = 0, porPag: number = 9999) {
    const url = URL_SERVICIOS + '/hospital' + '?desde=' + desde + '&porPag=' + porPag;
    return this.http.get(url);
  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  crearHospital( nombre: string) {
    const url = URL_SERVICIOS + '/hospital' + '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre: nombre});
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital);
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospital)
    );
  }
}
