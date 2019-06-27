import { Injectable } from '@angular/core';

export enum ETypeAlert {
  success,
  info,
  warning,
  danger
}

export interface IAlert {
  type: string,
  message: string,
  dismissible: boolean,
  dismissTimeout: number,
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  alerts: IAlert[] = [];
  constructor() { }

  addAlert(_type: string, _message: string, _dismissible: boolean, _dismissTimeout: number, _id: string) {
    const alert: IAlert = { type: _type, message: _message, dismissible: _dismissible, dismissTimeout: _dismissTimeout, id: _id };
    this.alerts.push(alert);
  }
}
