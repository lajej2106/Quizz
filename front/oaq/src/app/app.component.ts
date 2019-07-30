import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PlayerService } from './player/player.service';
import {Questions} from "./player/player.model";
import {SERVER_EVENTS} from "./constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oaq';


    questions: Questions;

  constructor(
    private readonly socket: Socket,
    private readonly playerService: PlayerService) {
  }

  ngOnInit() {
    const nomJoueur = sessionStorage.getItem('nomJoueur');
    if (nomJoueur != null) {
      this.playerService.nomJoueur = nomJoueur;
      this.socket.ioSocket.io.opts.query = { playerName: nomJoueur };
    }
    this.socket.connect();
  }
}
