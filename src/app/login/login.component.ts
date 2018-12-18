import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/services.index';

declare function init_plugins();
declare const gapi: any;  // se declara la libreria de Google importada en el index

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('emailField') emailField: ElementRef;

  recuerdame: boolean = false;
  email: string;

  // google la inicia desde gapi
  auth2: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private zone: NgZone
    ) { }

  ngOnInit() {
    init_plugins();
    this.init_google();
    this.init_campos();
  }

  init_google() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '860438189627-fdjh5eq3eouej4mqvql8b0fpga4k04bs.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin', /** Default value **/
        scope: 'profile email' });          /** Base scope **/

        this.attachGoogleSignin(document.getElementById('btnGoogle'));
    });
  }

  attachGoogleSignin( elemento ) {
    this.auth2.attachClickHandler( elemento, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.zone.run(() => {
        this.usuarioService.loginGoogle(token)
          .subscribe(resp => {
            this.router.navigate(['/dashboard']);
          });
      });
    });
  }

  init_campos() {
    this.email = localStorage.getItem('email') || '';
    this.recuerdame = this.email.length > 0;
    this.emailField.nativeElement.focus();
  }

  ingresar(forma: NgForm) {
    if (forma.valid) {
      const usuario = new Usuario(null, forma.value.email, forma.value.password);
      this.usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => {
        this.router.navigate(['/dashboard']);
      });
    }

  }
}
