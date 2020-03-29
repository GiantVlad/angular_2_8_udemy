import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'shorter'
})
export class ShortPipe implements PipeTransform {
  transform(value: string, limit = 10, ...args): any {
    if (value.length > limit) {
      return value.substring(0, limit) + ' ...';
    }
    return value;
  }
}
