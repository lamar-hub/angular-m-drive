import {Component, OnInit} from '@angular/core';
import {FileService} from './file.service';
import {File} from './file.model';

export interface MappedFile {
  fileID: string;
  typeClass: string;
  filename: string;
  size: number;
  lastModified: number;
}

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {

  mappedFiles: MappedFile[];
  filteredMappedFiles: MappedFile[];

  filenameAsc = true;
  modifiedAsc = true;
  sizeAsc = true;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.mappedFiles = this.map(this.fileService.getAllFiles());
    this.filteredMappedFiles = [...this.mappedFiles];
  }

  private map(files: File[]): MappedFile[] {
    const mappedFiles: MappedFile[] = [];
    files.forEach(file => {
      const typeClass = this.mapClass(file.filename);
      mappedFiles.push({fileID: file.fileID, filename: file.filename, lastModified: file.lastModified, size: file.size, typeClass});
    });
    return mappedFiles;
  }

  private mapClass(filename: string): string {
    const array = filename.split('.');
    let classReturn: string;
    switch (array[array.length - 1]) {
      case 'doc':
      case 'dot':
      case 'wbk':
      case 'docx':
      case 'docm':
      case 'docb':
      case 'dotm':
      case 'dotx':
        classReturn = 'fas fa-file-word text-primary fa-2x';
        break;
      case 'xls':
      case 'xlt':
      case 'xlm':
      case 'xlsx':
      case 'xlsm':
      case 'xlsb':
      case 'xla':
      case 'xlam':
      case 'xltm':
      case 'xll':
      case 'xlw':
        classReturn = 'fas fa-file-excel text-success fa-2x';
        break;
      case 'ppt':
      case 'pot':
      case 'pptx':
      case 'pptm':
      case 'potx':
      case 'potm':
      case 'ppam':
      case 'ppsx':
      case 'ppsm':
      case 'sldx':
      case 'sldm':
        classReturn = 'fas fa-file-powerpoint text-warning fa-2x';
        break;
      case 'pdf':
        classReturn = 'fas fa-file-pdf text-danger fa-2x';
        break;
      case 'jpeg':
      case 'jpg':
      case 'jif':
      case 'jpx':
      case 'png':
      case 'gif':
      case 'tiff':
      case 'psd':
      case 'eps':
      case 'ai':
      case 'indd':
      case 'raw':
        classReturn = 'fas fa-file-image fa-2x';
        break;
      case 'csv':
        classReturn = 'fas fa-file-csv fa-2x';
        break;
      case 'html':
      case 'css':
      case 'scss':
      case 'sass':
      case 'js':
      case 'jquery':
      case 'json':
      case 'c':
      case 'cpp':
      case 'cs':
      case 'fs':
      case 'java':
      case 'm':
      case 'php':
      case 'py':
      case 'r':
      case 'rb':
      case 'sql':
      case 'xml':
      case 'xsd':
      case 'swift':
      case 'vs':
        classReturn = 'fas fa-file-code fa-2x';
        break;
      case 'iso':
      case 'tar':
      case 'rar':
      case 'zip':
      case '7z':
      case 's7z':
      case 'war':
      case 'zipx':
      case 'zz':
      case 'jar':
        classReturn = 'fas fa-file-archive fa-2x';
        break;
      case 'webm':
      case 'mkv':
      case 'flv':
      case 'mng':
      case 'avi':
      case 'mov':
      case 'asf':
      case 'mp4':
      case 'mpg':
      case 'mpeg':
        classReturn = 'fas fa-file-video fa-2x';
        break;
      case 'aiff':
      case 'alac':
      case 'dvf':
      case 'm4p':
      case 'mmf':
      case 'mp3':
      case 'msv':
      case 'nsf':
      case 'sln':
      case 'voc':
      case 'vox':
      case 'wma':
        classReturn = 'fas fa-file-audio fa-2x';
        break;
      default:
        classReturn = 'fas fa-file fa-2x';
    }
    return classReturn;
  }

  onSortFilename() {
    this.filenameAsc = !this.filenameAsc;
    this.filteredMappedFiles = this.filteredMappedFiles.sort((first: MappedFile, second: MappedFile) => {
      if (first.filename > second.filename) {
        return this.filenameAsc ? 1 : -1;
      } else {
        return this.filenameAsc ? -1 : 1;
      }
    });
  }

  onSortLastModified() {
    this.modifiedAsc = !this.modifiedAsc;
    this.filteredMappedFiles = this.filteredMappedFiles.sort((first: MappedFile, second: MappedFile) => {
      return this.modifiedAsc ? second.lastModified - first.lastModified : first.lastModified - second.lastModified;
    });
  }

  onSortSize() {
    this.sizeAsc = !this.sizeAsc;
    this.filteredMappedFiles = this.filteredMappedFiles.sort((first: MappedFile, second: MappedFile) => {
      return this.sizeAsc ? second.size - first.size : first.size - second.size;
    });
  }


  onSearch(evt: any) {
    const value = evt.target.value;
    if (!value) {
      this.filteredMappedFiles = this.mappedFiles;
    } else {
      this.filteredMappedFiles = this.mappedFiles.filter(mappedFile => {
        if (mappedFile.filename.includes(value)) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  onFileChosen(file: any) {
    this.fileService.saveFile(file);
  }
}
