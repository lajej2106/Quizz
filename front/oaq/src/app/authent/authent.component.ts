import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from '../player/player.service';
import { AlertsService, ETypeAlert } from '../alerts/alerts.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { SERVER_EVENTS } from '../constant';

@Component({
  selector: 'app-authent',
  templateUrl: './authent.component.html',
  styleUrls: ['./authent.component.css']
})
export class AuthentComponent implements OnInit {

  nomForm: FormGroup;

  constructor(
    private readonly playerService: PlayerService,
    private readonly alertsService: AlertsService,
    private readonly router: Router,
    private readonly socket: Socket) {
  }

  ngOnInit() {

    this.registerServerEvents();

    this.nomForm = new FormGroup({
      'nom': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(22)
      ])
    });

    if (this.playerService.nomJoueur) {
      this.router.navigateByUrl("/showResult");
    }
  }

  validerNom() {
    this.playerService.connectPlayer(this.nomForm.value.nom);
  }

  private registerServerEvents() {
    this.socket.on(SERVER_EVENTS.NEW_PLAYER_SUCCESS, () => {
      this.playerService.nomJoueur = this.nomForm.value.nom;
      sessionStorage.setItem('nomJoueur', this.nomForm.value.nom);
      this.router.navigateByUrl("/showResult");
    });

    this.socket.on(SERVER_EVENTS.NEW_PLAYER_ERROR, (error) => {
      this.alertsService.addAlert(ETypeAlert[ETypeAlert.danger], error.msg, true, 5000, null);
    });
  }
}
