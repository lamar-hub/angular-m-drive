import {Pipe, PipeTransform} from '@angular/core';
import {Shared} from './shared.model';

@Pipe({
  name: 'searchShareds'
})
export class SearchSharedsPipe implements PipeTransform {

  transform(shareds: Shared[], key: string): Shared[] {
    if (!shareds) {
      return null;
    }
    return shareds.filter(shared => key ? shared.sharedFileFilename.includes(key)
                                          || shared.sharedUserEmail.includes(key)
                                          || shared.sharedUserName.includes(key)
                                          || shared.sharedUserSurname.includes(key) : true);
  }

}
