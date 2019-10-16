import {Injectable} from '@angular/core';
import {Shared} from './shared.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  shareds: Shared[] = [
    {
      sharedFile: {fileID: 'file-1', filename: 'tample.html', size: 23543, lastModified: 2323124524342, type: 'nebitno'},
      sharedUser: {userId: 'user-1', email: 'lazarmarinkovic29@gmail.com', name: 'Lazar', surname: 'Marinkovic', stored: 112, limit: 512},
      shareDate: 132323232323233,
      message: 'Posao je dobro odradjen!'
    },
    {
      sharedFile: {fileID: 'file-2', filename: 'tample.css', size: 2352425243, lastModified: 23231245424342, type: 'nebitno'},
      sharedUser: {userId: 'user-1', email: 'lazarmarinkovic29@gmail.com', name: 'Lazar', surname: 'Marinkovic', stored: 112, limit: 512},
      shareDate: 1323232323233,
      message: 'Kulajna!'
    },
    {
      sharedFile: {fileID: 'file-3', filename: 'tample.js', size: 243, lastModified: 23231254524342, type: 'nebitno'},
      sharedUser: {userId: 'user-1', email: 'lazarmarinkovic29@gmail.com', name: 'Lazar', surname: 'Marinkovic', stored: 112, limit: 512},
      shareDate: 1323232323233,
      message: 'Livada i njiva!'
    },
    {
      sharedFile: {fileID: 'file-4', filename: 'tample.mp4', size: 2365425243, lastModified: 26323124524342, type: 'nebitno'},
      sharedUser: {userId: 'user-1', email: 'lazarmarinkovic29@gmail.com', name: 'Lazar', surname: 'Marinkovic', stored: 112, limit: 512},
      shareDate: 1323232322223233,
      message: 'Fulcina!'
    },
  ];

  constructor() {
  }

  getAllShareds() {
    return [...this.shareds];
  }
}
