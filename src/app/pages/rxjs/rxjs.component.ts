import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';




@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.retornaObservable().subscribe({
      next: n => console.log(n),
      complete: () => console.log('completado...')
    });
  }


  retornaObservable(): Observable<any> {
    const observable = new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        observer.next(contador);

        if (contador === 3) {
          observer.complete();
          clearInterval(intervalo);
        }

      }, 1000);
    });
    return observable;
  }

}
