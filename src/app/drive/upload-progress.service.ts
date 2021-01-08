import {Injectable} from '@angular/core';

export interface IUploadFile {
  name: string;
  uploaded: number;
  size: number;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UploadProgressService {

  uploadFiles: IUploadFile[] = [];
  counter = 0;

  constructor() {
  }

  addUploadFile(uploadFile: IUploadFile) {
    this.uploadFiles.push(uploadFile);
    this.counter = this.counter + 1;
  }

  resetCounter() {
    this.counter = 0;
  }

  clear() {
    this.uploadFiles = [];
    this.counter = 0;
  }

  remove(uploadFile) {
    this.uploadFiles = this.uploadFiles.filter(t => t !== uploadFile);
  }

}
