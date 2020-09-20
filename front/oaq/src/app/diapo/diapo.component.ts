import {Component, OnInit} from '@angular/core';
import {Joueur, Question} from "../player/player.model";
import {CLIENT_EVENTS, SERVER_EVENTS} from "../constant";
import {Socket} from "ngx-socket-io";
import {Router} from "@angular/router";

@Component({
  selector: 'app-diapo',
  templateUrl: './diapo.component.html',
  styleUrls: ['./diapo.component.css']
})
export class DiapoComponent implements OnInit {

  constructor(private readonly socket: Socket, private readonly router: Router) {
  }

  letsGoFirst: boolean = false;
  topResponse: boolean = false;
  question: Question;
  compteARebour: number;
  compteARebourNumsTen: string = '0';
  compteARebourNumsOne: string = '0';
  listeJoueursRepondu: Joueur[];
  image: string = 'assets/images/PleaseWait.png';
  cssbtn1: string;
  cssbtn2: string;
  cssbtn3: string;
  cssbtn4: string;

  ngOnInit() {

    this.socket.on(CLIENT_EVENTS.SHOW_RESULTS, () => {
      this.router.navigateByUrl("/showResult");
    });

    this.socket.on(SERVER_EVENTS.GO_RESPONSE, () => {
      this.listeJoueursRepondu = [];
      this.cssbtn1 = 'btn-danger';
      this.cssbtn2 = 'btn-primary';
      this.cssbtn3 = 'btn-warning';
      this.cssbtn4 = 'btn-success';
      this.topResponse = true;
    })

    this.socket.on(SERVER_EVENTS.NEXT_QUESTIONS, (questionServeur: Question) => {
      this.letsGoFirst = true;
      this.topResponse = false;
      this.question = questionServeur;
      this.image = 'assets/images/' + this.question.image;
    });

    this.socket.on(SERVER_EVENTS.JOUEUR_REPONDU, (joueur: Joueur, bonneReponse: boolean) => {
      if(bonneReponse) {
        this.listeJoueursRepondu.push(joueur);
      }
    });

    this.socket.on(SERVER_EVENTS.COMPTE_A_REBOUR, (compteur: number) => {
      if (compteur == 0) {
        this.compteARebourNumsTen = '0';
        this.compteARebourNumsOne = '0';
        this.compteARebour = null;
        this.bonneReponses();
      } else {
        this.compteARebour = compteur;
        const digits = compteur.toString().split('');
        const realDigits = digits.map(Number)
        if (realDigits.length === 1) {
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


  private bonneReponses() {
    for (let resultat of this.question.resultats) {
      if (resultat.resultatLabel === this.question.reponses[0].reponseLabel) {
        this.cssbtn1 = 'btn-outline-primary';
      } else {
        this.cssbtn1 = 'btn-dark';
      }
      if (resultat.resultatLabel === this.question.reponses[1].reponseLabel) {
        this.cssbtn2 = 'btn-outline-primary';
      } else {
        this.cssbtn2 = 'btn-dark';
      }
      if (resultat.resultatLabel === this.question.reponses[2].reponseLabel) {
        this.cssbtn3 = 'btn-outline-primary';
      } else {
        this.cssbtn3 = 'btn-dark';
      }
      if (resultat.resultatLabel === this.question.reponses[3].reponseLabel) {
        this.cssbtn4 = 'btn-outline-primary';
      } else {
        this.cssbtn4 = 'btn-dark';
      }
    }
  }
}
