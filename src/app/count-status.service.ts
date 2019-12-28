import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountStatusService {
  countToInactive = new EventEmitter<number>();
  countToActive = new EventEmitter<number>();
}
