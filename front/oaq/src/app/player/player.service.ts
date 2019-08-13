import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CLIENT_EVENTS } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  nomJoueur: string;
  equipe: string;

  constructor(private readonly socket: Socket) { }

  connectPlayer(nom: string, equipe: string) {
    this.socket.emit(CLIENT_EVENTS.NEW_PLAYER, [nom, equipe]);
  }
}
