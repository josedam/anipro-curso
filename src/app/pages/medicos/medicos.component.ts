

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { ModalUploadService, MedicoService } from 'src/app/services/services.index';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})

export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  private notificacion: Subscription;

  constructor(
    private _medicoService: MedicoService,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.notificacion = this._modalUploadService.notificacion.subscribe(() => {
      this.cargarMedicos();
    });
  }

  ngOnDestroy(): void {
    this.notificacion.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;

    this._medicoService.cargarMedicos(this.desde)
      .subscribe(( resp: any) => {
        this.asignarMedicos(resp.medicos, resp.total);
        this.cargando = false;
      },
      err => {
        console.log('ERROR:');
        console.log(err);
      });
    }

  private asignarMedicos(medicos: Medico[], total: number) {
    this.medicos = medicos;
    this.totalRegistros = total;
  }
/*
  editarMedico(medico: Medico) {
    console.log('Editar Medico');
   // this._medicoService.actualizarMedico(medico)
   //   .subscribe();
  }
*/

  borrarMedico(medico: Medico) {
    swal({
      title: 'Esta Seguro..?',
      text: 'Esta a punto de borrar el Medico ' + medico.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Borrar'],
      dangerMode: true,
    })
    .then((puedeBorrar) => {
      if (puedeBorrar) {
        this.doBorrarMedico(medico);
      }
    });
  }

  private doBorrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id)
      .subscribe((resp: any) => {
        this.cargarMedicos();
        swal('Medico Borrado',
        {
          icon: 'success'
        });
      });
  }

  cambiarDesde(valor: number) {

  }

  buscarMedicos(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
    } else {
      this._medicoService.buscarMedicos(termino)
       .subscribe((medicos: Medico[]) => {
         this.asignarMedicos(medicos, medicos.length);
       });
    }
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('medico', id);
  }

  crearMedico(medico: Medico) {
    console.log('Crear Medico');
  }

}

