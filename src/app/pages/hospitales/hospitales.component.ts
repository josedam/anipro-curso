import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, ModalUploadService } from 'src/app/services/services.index';
import swal from 'sweetalert';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital [] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    private _hospitalService: HospitalService,
    private _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe(resp => {
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde)
      .subscribe(( resp: any) => {
        this.asignarHospitales(resp.hospitales, resp.total);
        this.cargando = false;
      },
      err => {
        console.log('ERROR:');
        console.log(err);
      });
    }

  private asignarHospitales(hospitales: Hospital[], total:number) {
    this.hospitales = hospitales;
    this.totalRegistros = total;
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();

  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Esta Seguro..?',
      text: 'Esta a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Borrar'],
      dangerMode: true,
    })
    .then((puedeBorrar) => {
      if (puedeBorrar) {
        this.doBorrarHospital(hospital);
      }
    });
  }

  private doBorrarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id)
      .subscribe((resp: any) => {
        this.cargarHospitales();
        swal('Hospital Borrado',
        {
          icon: 'success'
        });
      });
  }

  cambiarDesde(valor: number) {

  }

  buscarHospitales(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
    } else {
      this._hospitalService.buscarHospitales(termino)
       .subscribe((hospitales: Hospital[]) => {
         this.asignarHospitales(hospitales, hospitales.length);
       });
    }
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospital', id);
  }

  crearHospital() {

    swal({
      title: 'Nuevo Hospital',
      text: 'Ingrese el nombre',
      content: {element: 'input'},
      icon: 'info'

    })
    .then((value) => {
      if (!value) {
        return;
      }
      this._hospitalService.crearHospital(value)
        .subscribe(resp => {
          console.log(resp);
          this.cargarHospitales();
        });
    });
  }

}
