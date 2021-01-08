import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberToSize'
})
export class NumberToSizePipe implements PipeTransform {

  transform(size: number): string {
    if (size / 1073741820 >= 1) {
      return Math.round(size / 1073741820) + ' GB';
    }
    if (size / 1048576 >= 1) {
      return Math.round(size / 1048576) + ' MB';
    }
    if (size / 1024 >= 1) {
      return Math.round(size / 1024) + ' KB';
    }
    return size + ' Bytes';
  }

}
