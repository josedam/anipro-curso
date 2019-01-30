import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService, ModalUploadService } from 'src/app/services/services.index';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit, OnDestroy {

  medico: Medico = new Medico('', '', '', '', '');
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('', '0');
  
  private notificacion: Subscription;

  constructor(
    private _medicoService: MedicoService,
    private _hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this.cargarMedico();
    this.subscribirModal();
  }

  ngOnDestroy(): void {
    this.desubscribirModal();
  }

  private subscribirModal() {
    this.notificacion =  this.modalUploadService.notificacion
      .subscribe(resp => {
        this.medico.img = resp.medico.img;
      });
  }

  private desubscribirModal() {
    this.notificacion.unsubscribe();
  }

  cargarMedico() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.obtenerMedico(id);
      }
    });
  }
  cargarHospitales() {
    this._hospitalService.cargarHospitales(0)
      .subscribe((resp: any) => {
        this.hospitales = resp.hospitales;
      });
  }

  guardarMedico(f: NgForm) {
    if (f.valid) {
      this._medicoService.guardarMedico(this.medico)
        .subscribe((resp: any) => {
          swal('Medico Actualizado', resp.body.nombre, 'success');
          this.medico._id = resp.body._id;
          this.router.navigate(['medico', resp.body._id]);
        });
    }
  }

  obtenerMedico( id: string) {
    this._medicoService.obtenerMedico(id)
    .subscribe((medico: Medico) => {
      this.medico = medico;
      this.hospital = medico.hospital;             // Recibe un Objeto Hospital
      this.medico.hospital = medico.hospital._id;  // Lo cambia por el id del hospital que es string
     // this.cambioHospital(this.medico.hospital);
    });

  }

  cambioHospital(id: string) {
    if (id.length <= 0) {
      this.hospital = new Hospital('', '');
      return;
    }
    this._hospitalService.obtenerHospital (id)
      .subscribe((hospital: Hospital) => {
        if (hospital) {
          this.hospital = hospital;
        } else {
          this.hospital = new Hospital('', '');
        }
      });
  }

  cambiarFoto() {
     this.modalUploadService.mostrarModal('medico', this.medico._id);
  }
}
