import { Component, OnInit } from '@angular/core';
import {SERVER_EVENTS} from "../constant";
import {Socket} from "ngx-socket-io";
import {Question, Questions} from "../player/player.model";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  constructor(private readonly socket: Socket) { }

  questions: Questions;
  question: Question;
  index: number;

  ngOnInit() {
      this.index = 0;
      this.socket.on(SERVER_EVENTS.QUESTIONS, (questionsServeur: any) => {
          this.questions = questionsServeur.questions;
          if(this.questions) {
              this.questionSuivante();
          }
      });
      this.socket.on(SERVER_EVENTS.NEXT_QUESTIONS, () => {
          console.log("NEXT QUESTIONS");
          this.questionSuivante();
      });
  }

  questionSuivante() {
      if(this.questions) {
          console.log("Open question - index : " + this.index.toString());
          this.question = this.questions[this.index];
          console.log("question en cour: " + JSON.stringify(this.questions[this.index]));
          if (this.question) {
              this.index ++;
              console.log("Close question - index : " + this.index.toString());
          }
      }
  }
}