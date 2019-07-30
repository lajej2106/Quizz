import { Component, OnInit } from '@angular/core';
import { Player } from '../player/player.model';
import { Socket } from 'ngx-socket-io';
import { CLIENT_EVENTS, SERVER_EVENTS } from '../constant';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Player[];

  constructor(private readonly socket: Socket) { }

  ngOnInit() {
    this.displayedColumns = ['nom', 'score', 'position'];

    this.socket.emit(CLIENT_EVENTS.GET_PLAYERS, (players: Player[]) => {

      const sortComparator = (a: Player, b: Player) => {
        if (a.score > b.score) {
          return -1
        } else if (a.score === b.score) {
          return 0
        } else {
          return 1
        }
      };
      players.sort(sortComparator);

      const playersWithPosition = players.map((player, index) => {
        player.position = index + 1;
        return player;
      });
      this.dataSource = playersWithPosition;
    });

    this.socket.on(SERVER_EVENTS.NEW_PLAYER_SUCCESS, () => {

    });


  }

}
