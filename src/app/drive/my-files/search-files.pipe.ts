import {Pipe, PipeTransform} from '@angular/core';
import {File} from './file.model';

@Pipe({
  name: 'search'
})
export class SearchFilesPipe implements PipeTransform {

  transform(files: File[], key: string): File[] {
    if (!files) {
      return null;
    }
    return files.filter(file => key ? file.filename.includes(key) : true);
  }

}
