import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  pure: true
})
export class SortByPipe implements PipeTransform {

  transform(array: any[], filed: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!Array.isArray(array) || !filed) return array;
    return array.slice().sort((a, b) => {
      const valueA = a[filed];
      const valueB = b[filed];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      if (valueA instanceof Date && valueB instanceof Date) {
        return order === 'asc' ? (valueA.getTime() - valueB.getTime()) : (valueB.getTime() - valueA.getTime());
      }
      return 0;
    })
  }

}
