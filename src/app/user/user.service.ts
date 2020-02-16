import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  activated: Subject<boolean> = new Subject<boolean>();
  constructor() {}
}
