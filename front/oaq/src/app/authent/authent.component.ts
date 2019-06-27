import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from './player.service';
import { AlertsService, ETypeAlert } from '../alerts/alerts.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

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

    this.socket.on('connected', () => {
      this.playerService.nomJoueur = this.nomForm.value.nom;
      sessionStorage.setItem('nomJoueur', this.nomForm.value.nom);
      this.router.navigateByUrl("/waitForStart");
    });

    const nomJoueur = sessionStorage.getItem('nomJoueur');
    if (nomJoueur != null) {
      this.playerService.nomJoueur = nomJoueur;
    }

    this.nomForm = new FormGroup({
      'nom': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  validerNom() {
    this.playerService.connectPlayer(this.nomForm.value.nom);

    // this.playerService.savePlayer(this.nomForm.value.nom).subscribe(() => {
    //   this.playerService.nomJoueur = this.nomForm.value.nom;
    //   sessionStorage.setItem('nomJoueur', this.nomForm.value.nom);
    //   this.router.navigateByUrl("/waitForStart");
    // }, (error) => {
    //   if (!error.error.msg) {
    //     error.error = { msg: "Echec de connexion au serveur" };
    //   }
    //   this.alertsService.addAlert(ETypeAlert[ETypeAlert.danger], error.error.msg, true, 5000, null);
    // });
  }
}
