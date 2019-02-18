import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  LoginGuard,
  AdminGuard,
  VerificarTokenGuard,
  SubirArchivoService,
  ModalUploadService,
  HospitalService,
  MedicoService
} from './services.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    LoginGuard,
    AdminGuard,
    VerificarTokenGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService
  ]
})
export class ServicesModule {}
