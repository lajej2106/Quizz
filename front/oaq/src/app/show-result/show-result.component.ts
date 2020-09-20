import {Component, Input, OnInit} from '@angular/core';
import { Joueur } from '../player/player.model';
import { Socket } from 'ngx-socket-io';
import { CLIENT_EVENTS, SERVER_EVENTS } from '../constant';
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {

  @Input() activeRoute: boolean = true;

  displayedColumns: string[];
  joueurs: Joueur[];
  totalOlivier: number=0;
  totalAuore:number=0;
  finDuJeux: boolean = false;

  constructor(private readonly socket: Socket, private readonly  router: Router) { }

  ngOnInit() {
    this.displayedColumns = ['nom', 'score', 'position'];

    this.socket.on(SERVER_EVENTS.NAVIGUE_VERS_DIAPO, () => {
      if(this.activeRoute) {
        this.router.navigateByUrl("/diapo");
      }
      this.totalAuore = 0;
      this.totalOlivier = 0;
      this.calculAffichage();
    });

    this.calculAffichage();
  }

  private calculAffichage() {

    this.socket.on(SERVER_EVENTS.END_GAMES, () => {
      this.finDuJeux = true;
    });

    this.socket.emit(CLIENT_EVENTS.GET_PLAYERS, (joueur: Joueur[]) => {

      const sortComparator = (a: Joueur, b: Joueur) => {
        if (a.score > b.score) {
          return -1
        } else if (a.score === b.score) {
          return 0
        } else {
          return 1
        }
      };
      joueur.sort(sortComparator);

      const playersWithPosition = joueur.map((player, index) => {
        player.position = index + 1;
        return player;
      });
      this.joueurs = playersWithPosition;

      for(const j in this.joueurs){
        if(this.joueurs[j].equipe === 'Aurore') {
          this.totalAuore = this.totalAuore + this.joueurs[j].score;
        }
        if(this.joueurs[j].equipe === 'Olivier') {
          this.totalOlivier = this.totalOlivier + this.joueurs[j].score;
        }
      }
    });
  }
}
