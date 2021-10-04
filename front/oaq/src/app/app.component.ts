import {Component, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {PlayerService} from './player/player.service';
import {Questions} from "./player/player.model";
import {SERVER_EVENTS} from "./constant";
import {AutorisationComponent} from "./autorisation/autorisation.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oaq';

  letsGo: boolean = false;
  questions: Questions;


  constructor(
    private readonly socket: Socket,
    private readonly playerService: PlayerService) {
  }

  ngOnInit() {
    const nomJoueur = sessionStorage.getItem('nomJoueur');
    const equipe = sessionStorage.getItem('equipe');
    if (nomJoueur != null) {
      this.playerService.nomJoueur = nomJoueur;
      this.playerService.equipe = equipe;
      this.socket.ioSocket.io.opts.query = {nomJoueur: nomJoueur, equipe: equipe};
    }
    this.socket.connect();
  }
}
