import { Component, OnInit } from '@angular/core';
import { Joueurs } from '../player/player.model';
import { Socket } from 'ngx-socket-io';
import { CLIENT_EVENTS, SERVER_EVENTS } from '../constant';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Joueurs[];

  constructor(private readonly socket: Socket) { }

  ngOnInit() {
    this.displayedColumns = ['nom', 'score', 'position'];

    this.socket.emit(CLIENT_EVENTS.GET_PLAYERS, (joueur: Joueurs[]) => {

      const sortComparator = (a: Joueurs, b: Joueurs) => {
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
      this.dataSource = playersWithPosition;
    });

    this.socket.on(SERVER_EVENTS.NEW_PLAYER_SUCCESS, () => {

    });


  }

}
