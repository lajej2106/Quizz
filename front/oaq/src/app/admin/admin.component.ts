import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Socket } from 'ngx-socket-io';
import {CLIENT_EVENTS, SERVER_EVENTS} from "../constant";
import {Joueur} from "../player/player.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  joueurs: Joueur[];
  autoRefreshInterval: any;
  isAutoRefresh = false;
  private listeJoueursMauvaiseReponduMari: Joueur[];
  private listeJoueursBonneReponduMari: Joueur[];
  private listeJoueursMauvaiseReponduMariee: Joueur[];
  private listeJoueursBonneReponduMariee: Joueur[];



  constructor(private readonly playerService: PlayerService, private readonly socket: Socket) { }

  ngOnInit() {
    this.socket.on("globalMessage", (msg) => {
      console.log('globalMessageReceived', msg);
    });

    this.socket.on(SERVER_EVENTS.GO_RESPONSE, () => {
      this.listeJoueursMauvaiseReponduMari = [];
      this.listeJoueursBonneReponduMari = [];
      this.listeJoueursMauvaiseReponduMariee = [];
      this.listeJoueursBonneReponduMariee = [];

    })

    this.socket.on(SERVER_EVENTS.JOUEUR_REPONDU, (joueur: Joueur, bonneReponse: boolean) => {
      if(bonneReponse) {
        if(joueur.equipe === 'Aurore') {
          this.listeJoueursBonneReponduMariee.push(joueur);
        }
        if(joueur.equipe === 'Olivier') {
          this.listeJoueursBonneReponduMari.push(joueur);
        }
      } else {
        if(joueur.equipe === 'Aurore') {
          this.listeJoueursMauvaiseReponduMariee.push(joueur);
        }
        if(joueur.equipe === 'Olivier') {
          this.listeJoueursMauvaiseReponduMari.push(joueur);
        }
      }
    });
  }

    questionNext() {
        this.socket.emit('broadcastQuestionNext');


      this.socket.emit(CLIENT_EVENTS.GET_PLAYERS, (joueurs: Joueur[]) => {
        this.joueurs = joueurs;
      });
    }

    showResults() {
      this.socket.emit('goToResults');
    }


}
