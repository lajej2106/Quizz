import {Component, OnInit} from '@angular/core';
import {CLIENT_EVENTS, SERVER_EVENTS} from "../constant";
import {Socket} from "ngx-socket-io";
import {Joueurs, Question, Questions} from "../player/player.model";
import {$} from "protractor";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionActive: boolean = false;
  compteARebour: number = null;
  displayedColumns: string[];
  listeJoueursOlivier: Joueurs[];
  listeJoueursAurore: Joueurs[];

  constructor(private readonly socket: Socket) {
  }

  question: Question;

  ngOnInit() {
    this.displayedColumns = ['nom'];

    this.getListeJoueurs();
    this.socket.on(SERVER_EVENTS.NEW_PLAYER_SUCCESS, () => {
      this.getListeJoueurs();
    });

    this.socket.on(SERVER_EVENTS.NEXT_QUESTIONS, (questionServeur: Question) => {
      this.question = questionServeur;
      this.questionActive = true;
    });

    console.log("compteur init ");
    this.socket.on(SERVER_EVENTS.COMPTE_A_REBOUR, (compteur: number) => {
      console.log("compteur : " + compteur.toString());
      if (compteur == 0) {
        this.compteARebour = null;
        this.questionActive = false;
      } else {
        this.compteARebour = (compteur / 20 * 100);
      }
    });
  }

  getListeJoueurs() {
    this.socket.emit(CLIENT_EVENTS.GET_PLAYERS, (joueurs: Joueurs[]) => {
      console.log('Joueurs : ' + JSON.stringify(joueurs));
      this.listeJoueursOlivier = [];
      this.listeJoueursAurore = [];
      for (const i in joueurs) {
        if (joueurs[i].equipe === 'Olivier') {
          this.listeJoueursOlivier.push(joueurs[i]);
        }
        if (joueurs[i].equipe === 'Aurore') {
          this.listeJoueursAurore.push(joueurs[i]);
        }
      }
    });
  }

  repondre(reponse: number) {
    this.questionActive = false;
    this.socket.emit(CLIENT_EVENTS.REPONSE_QUESTION, reponse);
  }
}
