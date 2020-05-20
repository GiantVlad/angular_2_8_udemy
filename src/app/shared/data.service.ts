import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class DataService {
  public getData(): Promise<{data: string}> {
    const prom = new Promise<{data: string}>((res, rej) => {
      setTimeout(() => {
        res({data: 'newData'});
      },1500);
    });
    return prom;
  }
}
