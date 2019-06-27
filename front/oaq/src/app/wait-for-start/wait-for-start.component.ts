import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../authent/player.service';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

@Component({
  selector: 'app-wait-for-start',
  templateUrl: './wait-for-start.component.html',
  styleUrls: ['./wait-for-start.component.css']
})
export class WaitForStartComponent implements OnInit {

  constructor(private readonly playerService: PlayerService) { }

  ngOnInit() {

  }

}
