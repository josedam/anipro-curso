import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChanges(nuevoValor: number) {
    this.impactarCambio(nuevoValor);
  }

  cambiarvalor(valor) {
    this.impactarCambio(this.progreso + valor);
  }

  impactarCambio(valor: number) {
    this.progreso = this.valorAjustado(valor);
    this.cambioValor.emit(this.progreso);
    this.ajustarTexto();
  }

  ajustarTexto() {
    this.txtProgreso.nativeElement.value = this.progreso;
    this.txtProgreso.nativeElement.focus();

//    let campoHtml =  document.getElementsByName('progreso')[0];
//    console.log(campoHtml.value, this.progreso);
//    campoHtml.value = this.progreso;
  }

  valorAjustado(valor: number) {
    if (valor > 100) {
      valor = 100;
    } else if (valor <= 0) {
      valor = 0;
    }
    return valor;
  }
}
