import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(private _ajustes: SettingsService) {}

  ngOnInit() {
    this.restaurarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this._ajustes.aplicarTema(tema);
    this.aplicarCheck(link);
  }
 
  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  restaurarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;

    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
