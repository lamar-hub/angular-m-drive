import {Pipe, PipeTransform} from '@angular/core';
import {File} from './my-files/file.model';

@Pipe({
  name: 'sortString'
})
export class SortStringPipe implements PipeTransform {

  transform(data, col: string, asc: boolean) {
    if (!data) {
      return null;
    }
    return data.sort((first, second) => {
      if (first[col] > second[col]) {
        return asc ? 1 : -1;
      } else {
        return asc ? -1 : 1;
      }
    });
  }

}
