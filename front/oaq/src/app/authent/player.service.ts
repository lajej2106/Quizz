import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  nomJoueur: string;

  constructor(private readonly socket: Socket) { }


  connectPlayer(nom: string) {
    this.socket.emit('newPlayer', nom);
  }
}
