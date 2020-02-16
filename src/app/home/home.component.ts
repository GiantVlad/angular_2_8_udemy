import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private intervalSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    /*this.intervalSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });*/
    const customObservableInterval = new Observable(observer => {
      let count = 0;
      setInterval( () => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count grete than 3'));
        }
        count++;
      }, 1000);
    });
    this.intervalSubscription = customObservableInterval.pipe(
      filter((count: number) => count > 0 ),
      map((count: number) => 'Round ' + (count + 1))).subscribe(
      count => { console.log(count); },
        error => { console.log(error); },
      () => { console.log('Counter finished'); }
      );
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

}
