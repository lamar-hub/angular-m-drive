import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortNumber'
})
export class SortNumberPipe implements PipeTransform {

  transform(data, col: string, asc: boolean) {
    if (!data) {
      return null;
    }
    return data.sort((first, second) => {
          return asc ? second[col] - first[col] : first[col] - second[col];
    });
  }

}
