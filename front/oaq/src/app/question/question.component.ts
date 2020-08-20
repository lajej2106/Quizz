import {Component, OnInit} from '@angular/core';
import {CLIENT_EVENTS, SERVER_EVENTS} from "../constant";
import {Socket} from "ngx-socket-io";
import {Joueur, Question} from "../player/player.model";
import {ModalComponent} from "./modal/modal.component";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questionActive: boolean = false;
  compteARebour: number = null;
  displayedColumns: string[];
  listeJoueursOlivier: Joueur[];
  listeJoueursAurore: Joueur[];
  reponse: any;
  cssbtn1: string;
  cssbtn2: string;
  cssbtn3: string;
  cssbtn4: string;

  constructor(private readonly socket: Socket,
              private readonly router: Router,
              public modal: MatDialog) {
  }


  question: Question;
  modalSpinner: MatDialogRef<ModalComponent, any>;

  ngOnInit() {
    this.openModal();
    this.displayedColumns = ['nom'];

    this.getListeJoueurs();
    this.socket.on(SERVER_EVENTS.BROADCAST_NOUVEAU_JOUEUR, () => {
      this.getListeJoueurs();
      this.router.navigateByUrl("/questions");
    });

    this.socket.on(SERVER_EVENTS.NEXT_QUESTIONS, (questionServeur: Question) => {
      this.closeModal();
      this.question = questionServeur;
      this.questionActive = true;
      this.cssbtn1 = null;
      this.cssbtn2 = null;
      this.cssbtn3 = null;
      this.cssbtn4 = null;
    });

    console.log("compteur init ");
    this.socket.on(SERVER_EVENTS.COMPTE_A_REBOUR, (compteur: number) => {
      if (compteur == 0) {
        this.bonneReponse();
        this.compteARebour = null;
        this.questionActive = false;
        this.closeModal();
      } else {
        this.compteARebour = (compteur / 20 * 100);
      }
    });
  }

  getListeJoueurs() {
    this.socket.emit(CLIENT_EVENTS.GET_PLAYERS, (joueurs: Joueur[]) => {
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

  repondre(reponse: any) {
    this.reponse = reponse;
    this.openModal();
    this.questionActive = false;
    this.socket.emit(CLIENT_EVENTS.REPONSE_QUESTION, reponse);
    this.reponseSelection(reponse);
  }


  openModal(): void {
    this.modalSpinner = this.modal.open(ModalComponent, {
      /*width: '100%',*/
      position: {top: '0px'}, disableClose: true
    });
  }

  closeModal(): void {
    if (this.modalSpinner) {
      this.modalSpinner.close();
    }
  }

  private bonneReponse() {
    for (let resultat of this.question.resultats) {
      if (resultat.resultatLabel === this.question.reponses[0].reponseLabel) {
        if (resultat.resultatLabel === this.reponse) {
          this.cssbtn1 = 'btn-outline-success';
        } else {
          this.cssbtn1 = 'btn-outline-primary';
        }
      }
      if (resultat.resultatLabel === this.question.reponses[1].reponseLabel) {
        if (resultat.resultatLabel === this.reponse) {
          this.cssbtn2 = 'btn-outline-success';
        } else {
          this.cssbtn2 = 'btn-outline-primary';
        }
      }
      if (resultat.resultatLabel === this.question.reponses[2].reponseLabel) {
        if (resultat.resultatLabel === this.reponse) {
          this.cssbtn3 = 'btn-outline-success';
        } else {
          this.cssbtn3 = 'btn-outline-primary';
        }
      }
      if (resultat.resultatLabel === this.question.reponses[3].reponseLabel) {
        if (resultat.resultatLabel === this.reponse) {
          this.cssbtn4 = 'btn-outline-success';
        } else {
          this.cssbtn4 = 'btn-outline-primary';
        }
      }
    }
  }

  reponseSelection(reponse: any) {
    this.cssbtn1 = null;
    this.cssbtn2 = null;
    this.cssbtn3 = null;
    this.cssbtn4 = null;

    if (reponse === this.question.reponses[0].reponseLabel) {
      this.cssbtn1 = 'btn-danger';
    }
    if (reponse === this.question.reponses[1].reponseLabel) {
      this.cssbtn2 = 'btn-primary';
    }
    if (reponse === this.question.reponses[2].reponseLabel) {
      this.cssbtn3 = 'btn-warning';
    }
    if (reponse === this.question.reponses[3].reponseLabel) {
      this.cssbtn4 = 'btn-success';
    }
  }
}


