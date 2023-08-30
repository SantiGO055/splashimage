import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any, value: string): any {
    if (!value) return items;

    if (!items) return value;

    value = value.toLowerCase();
    return items.filter((data: any) => {
      return JSON.stringify(data).toLowerCase().includes(value);
    })
  }

}
