import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})
export class SearchPipe implements PipeTransform {

  transform<T>(items: T[] | null, searchText: string, filed: keyof T): T[] {
    if (!items || !searchText) return items ?? [];
    const lowerSearch = searchText.toLowerCase();
    return items.filter(item => String(item[filed]).toLowerCase().includes(lowerSearch));
  }

}
