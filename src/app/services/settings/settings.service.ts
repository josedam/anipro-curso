import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

const AJUSTES_STORE_NAME = 'ajustes';

export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.restaurarTema();
  }

  guardar() {
    localStorage.setItem(AJUSTES_STORE_NAME, JSON.stringify(this.ajustes));
  }

  cargar() {
    if (localStorage.getItem(AJUSTES_STORE_NAME)) {
      this.ajustes = JSON.parse(localStorage.getItem(AJUSTES_STORE_NAME));
    }
  }

  restaurarTema() {
    this.cargar();
    this.aplicar();
  }

  aplicarTema(tema) {
    this.setTema(tema);
    this.guardar();
    this.aplicar();
  }

  setTema(tema: string) {
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = `assets/css/colors/${tema}.css`;
  }

  aplicar() {
    this._document
      .getElementById('tema')
      .setAttribute('href', this.ajustes.temaUrl);
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
