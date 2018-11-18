import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/services.index';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styles: []
})
export class SiderbarComponent implements OnInit {

  constructor(public _sidebar: SidebarService) { }

  ngOnInit() {
  }

}
