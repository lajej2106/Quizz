import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  joueurs: any[];
  autoRefreshInterval: any;
  isAutoRefresh = false;

  constructor(private readonly playerService: PlayerService, private readonly socket: Socket) { }

  ngOnInit() {
    this.socket.on("globalMessage", (msg) => {
      console.log('globalMessageReceived', msg);
    });
  }

  broadcast() {
    console.log('click on broadcast');
    this.socket.emit('broadcastToAll', 'mon super message');
  }

    questionNext() {
        console.log('click on question Next');
        this.socket.emit('broadcastQuestionNext');
    }
}
