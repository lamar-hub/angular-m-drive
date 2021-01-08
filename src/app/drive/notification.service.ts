import { Injectable } from '@angular/core';

export interface INotification {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: INotification[] = [];
  counter = 0;

  constructor() { }

  addNotification(notification: INotification) {
    this.notifications.push(notification);
    this.counter = this.counter + 1;
  }

  resetCounter() {
    this.counter = 0;
  }

  clear() {
    this.notifications = [];
    this.counter = 0;
  }

  remove(notification) {
    this.notifications = this.notifications.filter(t => t !== notification);
  }

}
