import {Component, OnInit} from '@angular/core';
import {Shared} from './shared.model';
import {SharedService} from './shared.service';

interface MappedShared {
  sharedFileID: string;
  sharedUserID: string;
  typeClass: string;
  filename: string;
  size: number;
  lastModified: number;
  email: string;
  name: string;
  message: string;
  shareDate: number;
}

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss']
})
export class SharedWithMeComponent implements OnInit {

  mappedShareds: MappedShared[];
  filteredMappedShareds: MappedShared[];

  filenameAsc = true;
  modifiedAsc = true;
  sizeAsc = true;
  nameAsc = true;
  shareDateAsc = true;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.mappedShareds = this.map(this.sharedService.getAllShareds());
    this.filteredMappedShareds = [...this.mappedShareds];
  }

  private map(shareds: Shared[]): MappedShared[] {
    const mappedShareds: MappedShared[] = [];
    shareds.forEach(shared => {
      const typeClass = this.mapClass(shared.sharedFile.filename);
      mappedShareds.push(
        {
          email: shared.sharedUser.userId,
          filename: shared.sharedFile.filename,
          lastModified: shared.sharedFile.lastModified,
          message: shared.message,
          name: shared.sharedUser.userId,
          shareDate: shared.shareDate,
          sharedUserID: shared.sharedUser.userId,
          sharedFileID: shared.sharedFile.fileID,
          size: shared.sharedFile.size,
          typeClass
        }
      );
    });
    return mappedShareds;
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
    this.filteredMappedShareds = this.filteredMappedShareds.sort((first: MappedShared, second: MappedShared) => {
      if (first.filename > second.filename) {
        return this.filenameAsc ? 1 : -1;
      } else {
        return this.filenameAsc ? -1 : 1;
      }
    });
  }

  onSortLastModified() {
    this.modifiedAsc = !this.modifiedAsc;
    this.filteredMappedShareds = this.filteredMappedShareds.sort((first: MappedShared, second: MappedShared) => {
      return this.modifiedAsc ? second.lastModified - first.lastModified : first.lastModified - second.lastModified;
    });
  }

  onSortSize() {
    this.sizeAsc = !this.sizeAsc;
    this.filteredMappedShareds = this.filteredMappedShareds.sort((first: MappedShared, second: MappedShared) => {
      return this.sizeAsc ? second.size - first.size : first.size - second.size;
    });
  }

  onSortName() {
    this.nameAsc = !this.nameAsc;
    this.filteredMappedShareds = this.filteredMappedShareds.sort((first: MappedShared, second: MappedShared) => {
      if (first.name > second.name) {
        return this.filenameAsc ? 1 : -1;
      } else {
        return this.filenameAsc ? -1 : 1;
      }
    });
  }

  onSortShareDate() {
    this.shareDateAsc = !this.shareDateAsc;
    this.filteredMappedShareds = this.filteredMappedShareds.sort((first: MappedShared, second: MappedShared) => {
      return this.shareDateAsc ? second.shareDate - first.shareDate : first.shareDate - second.shareDate;
    });
  }

  onSearch(evt: any) {
    const value = evt.target.value;
    if (!value) {
      this.filteredMappedShareds = this.mappedShareds;
    } else {
      this.filteredMappedShareds = this.mappedShareds.filter(mappedShared => {
        if (mappedShared.filename.includes(value) || mappedShared.name.includes(value)) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

}
