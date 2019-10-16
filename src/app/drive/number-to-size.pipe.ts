import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberToSize'
})
export class NumberToSizePipe implements PipeTransform {

  transform(size: number): string {
    if (size / 1000000000 >= 1) {
      return Math.round(size / 10000000) / 100 + ' GB';
    }
    if (size / 1000000 >= 1) {
      return Math.round(size / 10000) / 100 + ' MB';
    }
    if (size / 1000 >= 1) {
      return Math.round(size / 10) / 100 + ' KB';
    }
    return size + ' Bytes';
  }

}
