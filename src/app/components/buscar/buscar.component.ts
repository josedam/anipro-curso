import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: []
})
export class BuscarComponent implements OnInit, OnDestroy {

  @Output() buscar: EventEmitter<String> = new EventEmitter();

  constructor() { }

  private entrada: Subscription;

  ngOnInit() {

    const input = document.getElementById('ingreso');
    // for every keyup, map to current input value
    this.entrada = fromEvent(input, 'keyup')
      .pipe(
        map((i: any) => i.currentTarget.value),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(s  => {
        this.buscar.next(s);
      });
  }

  ngOnDestroy(): void {
    this.entrada.unsubscribe();
  }
}
