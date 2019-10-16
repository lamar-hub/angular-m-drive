import {User} from '../../auth/user.model';
import {File} from '../my-files/file.model';

export class Shared {
  constructor(
    public sharedUser: User,
    public sharedFile: File,
    public message: string,
    public shareDate: number
  ) {
  }
}
