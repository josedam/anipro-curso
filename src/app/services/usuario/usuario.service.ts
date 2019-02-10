import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError, of} from 'rxjs';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  id: string = '';
  token: string = '';
  usuario: Usuario = null;
  menu: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private subirArchivoService: SubirArchivoService
    ) {
      this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') || '';
      this.id = localStorage.getItem('id') || '';
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.menu = JSON.parse( localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.id = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  estaLogeado() {
    return  this.token.length > 0;
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.cargarStorage();
    this.router.navigate(['/login']);
  }


  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
    return this.http.post(url, usuario)
    .pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError((err: any) => {
        swal('Ingreso Rechazado', err.error.mensaje, 'error');
        return throwError(err); // of([]); //   throwError(err);
      })
    );
  }

  crearUsuario(usuario: Usuario){
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return resp.body;
      }),
      catchError((err: any) => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err); // of([]); //   throwError(err);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
        }
        swal('Usuario Actualizado', usuario.nombre, 'success');
        return true; // resp.body;
      }),
      catchError((err: any) => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err); // of([]); //   throwError(err);
      })
    );
  }

  actualizarImagen(archivo: File, id: string){
      this.subirArchivoService.subirArchivo(archivo, 'usuario', id)
      .then((resp: any) => {
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log('Error', resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario' + '?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.usuario)
    );
  }

  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url);
  }

}
