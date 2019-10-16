import {Injectable} from '@angular/core';
import {File} from './file.model';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  files: File[] = [
    {fileID: '1', filename: 'text.json', size: 254441, lastModified: 157036811911, type: 'text/json'},
    {fileID: '2', filename: 'text.pdf', size: 254444911, lastModified: 1572036811962, type: 'application/pdf'},
    {fileID: '3', filename: 'text.docx', size: 2542, lastModified: 125703681193, type: 'application/docx'},
    {fileID: '4', filename: 'text.csv', size: 2542, lastModified: 125703681193, type: 'application/csv'},
    {fileID: '5', filename: 'text.php', size: 2542, lastModified: 125703681193, type: 'application/php'}
  ];

  getAllFiles() {
    return [...this.files];
  }

  saveFile(file: any) {
    this.files.push({fileID: 'user-1', filename: file.name, lastModified: file.lastModified, type: file.type, size: file.size});
  }
}
