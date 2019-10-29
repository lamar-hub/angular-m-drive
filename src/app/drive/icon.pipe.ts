import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(filename: string): string {
    const array = filename.split('.');
    let classReturn: string;
    switch (array[array.length - 1]) {
      case 'txt':
        classReturn = 'fas fa-file-alt text-primary fa-2x';
        break;
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

}
