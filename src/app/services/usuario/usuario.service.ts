import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  id: string = '';
  token: string = '';
  usuario: Usuario = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private subirArchivoService: SubirArchivoService
    ) {
      this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.cargarStorage();
  }

  cargarStorage() {
    this.id = localStorage.getItem('id') || '';
    this.token = localStorage.getItem('token') || '';
    this.usuario = JSON.parse( localStorage.getItem('usuario'));
  }

  estaLogeado() {
    return  this.token.length > 0;
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.cargarStorage();
    this.router.navigate(['/login']);
  }


  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario){
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return resp.body;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        swal('Usuario Actualizado', usuario.nombre, 'success');
        return true; // resp.body;
      })
      );
    }
    
    actualizarImagen(archivo: File, id: string){
      this.subirArchivoService.subirArchivo(archivo, 'usuario', id)
      .then((resp: any) => {
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log('Error', resp);
      });
  }
}
