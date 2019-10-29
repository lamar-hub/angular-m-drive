import {Injectable} from '@angular/core';

export interface IToast {
  header: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: IToast[] = [];

  constructor() {
  }

  show(toast: IToast) {
    this.toasts.push(toast);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
