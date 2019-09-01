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

  setNomJoueur(nom: string) {
    this.nomJoueur = nom;
  }

  getNomJoueur() {
    return this.nomJoueur;
  }

  setEquipe(equipe: string) {
    this.equipe = equipe;
  }

  getEquipe() {
    return this.equipe;
  }

  connectPlayer(nom: string, equipe: string) {
    this.socket.emit(CLIENT_EVENTS.NEW_PLAYER, [nom, equipe]);
  }
}
