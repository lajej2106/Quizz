import { Component, OnInit } from '@angular/core';
import {Joueurs, Question} from "../player/player.model";
import {SERVER_EVENTS} from "../constant";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-diapo',
  templateUrl: './diapo.component.html',
  styleUrls: ['./diapo.component.css']
})
export class DiapoComponent implements OnInit {

  constructor(private readonly socket: Socket) { }

  letsGo: boolean = false;
  question: Question;
  compteARebour: number;
  compteARebourNumsTen: string = '0';
  compteARebourNumsOne: string = '0';
  listeJoueursRepondu: Joueurs[];
  image: string = 'assets/images/PleaseWait.png';

  ngOnInit() {

    this.socket.on(SERVER_EVENTS.NEXT_QUESTIONS, (compteur: number) => {
      this.letsGo = true;
    });

    this.socket.on(SERVER_EVENTS.NEXT_QUESTIONS, (questionServeur: Question) => {
      this.question = questionServeur;
      this.image = 'assets/images/' + this.question.image;
      this.listeJoueursRepondu = [];
    });

    this.socket.on(SERVER_EVENTS.JOUEUR_REPONDU, (joueur: Joueurs) => {
      this.listeJoueursRepondu.push(joueur);
    });

    this.socket.on(SERVER_EVENTS.COMPTE_A_REBOUR, (compteur: number) => {
      if (compteur == 0) {
        this.compteARebourNumsTen = '0';
        this.compteARebourNumsOne = '0';
        this.compteARebour = null;
      } else {
        this.compteARebour = compteur;
        const digits = compteur.toString().split('');
        const realDigits = digits.map(Number)
        if (realDigits.length === 1){
          this.compteARebourNumsTen = '0';
          this.compteARebourNumsOne = realDigits[0].toString();
        } else {
          this.compteARebourNumsTen = realDigits[0].toString();
          this.compteARebourNumsOne = realDigits[1].toString();
        }

        console.log(this.compteARebourNumsTen + ' - ' + this.compteARebourNumsOne)
      }
    });
  };
}
