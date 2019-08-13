import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from '../player/player.service';
import { AlertsService, ETypeAlert } from '../alerts/alerts.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { SERVER_EVENTS } from '../constant';
import {Questions} from "../player/player.model";

@Component({
  selector: 'app-authent',
  templateUrl: './authent.component.html',
  styleUrls: ['./authent.component.css']
})
export class AuthentComponent implements OnInit {

  inscriptionForm: FormGroup;

  constructor(
    private readonly playerService: PlayerService,
    private readonly alertsService: AlertsService,
    private readonly router: Router,
    private readonly socket: Socket) {
  }

  ngOnInit() {

    this.registerServerEvents();

    this.inscriptionForm = new FormGroup({
      'nom': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(22)
      ]),
        'equipe': new FormControl('', [
            Validators.required
        ])
    });

    if (this.playerService.nomJoueur) {
          this.router.navigateByUrl("/questions");
    }
  }

  validerNom() {
    this.playerService.connectPlayer(this.inscriptionForm.value.nom, this.inscriptionForm.value.equipe);
  }

  private registerServerEvents() {
    this.socket.on(SERVER_EVENTS.NEW_PLAYER_SUCCESS, () => {
      this.playerService.nomJoueur = this.inscriptionForm.value.nom;
      this.playerService.equipe = this.inscriptionForm.value.equipe;
      sessionStorage.setItem('nomJoueur', this.inscriptionForm.value.nom);
      sessionStorage.setItem('equipe', this.inscriptionForm.value.equipe);
        this.router.navigateByUrl("/questions");
    });

    this.socket.on(SERVER_EVENTS.NEW_PLAYER_ERROR, (error) => {
      this.alertsService.addAlert(ETypeAlert[ETypeAlert.danger], error.msg, true, 5000, null);
    });
  }
}
