import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  column: string;
  transform(values: {[key: string]: any}[], sortByColumn: string): any {
    if (sortByColumn === '') {
      return values;
    }
    this.column = sortByColumn;
    return values.sort(this.compare.bind(this));
  }
  private compare(a, b) {
    if (a[this.column] > b[this.column]) { return 1; }
    if (b[this.column] > a[this.column]) { return -1; }
    return 0;
  }
}
