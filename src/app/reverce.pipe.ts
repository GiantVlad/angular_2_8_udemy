import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): any {
    if (value.length === 0) {
      return value;
    }
    return this.reverseString(value);
  }

  private reverseString(str: string): string {
    return str.split('').reverse().join('');
  }
}
