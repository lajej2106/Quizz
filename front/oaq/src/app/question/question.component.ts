import { Component, OnInit } from '@angular/core';
import {SERVER_EVENTS} from "../constant";
import {Socket} from "ngx-socket-io";
import {Questions} from "../player/player.model";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  constructor(private readonly socket: Socket) { }

  questions: Questions;

  ngOnInit() {
      console.log("Questions RUN");
      this.socket.on(SERVER_EVENTS.QUESTIONS, (questionsServeur: Questions) => {
          this.questions = questionsServeur;
          console.log("Questions serveur : " + JSON.stringify(this.questions));
      });
  }

}
