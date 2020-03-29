import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.leng === 0 || filterString === '') {
      return value;
    }
    const val = value.filter(item => item[propName] === filterString);
    return val === undefined ? null : val;
  }
}
