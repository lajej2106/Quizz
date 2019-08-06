import {Component, OnInit} from '@angular/core';
import {CLIENT_EVENTS, SERVER_EVENTS} from "../constant";
import {Socket} from "ngx-socket-io";
import {Question, Questions} from "../player/player.model";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


    constructor(private readonly socket: Socket) {
    }

    question: Question;

    ngOnInit() {
        /*this.socket.on(SERVER_EVENTS.QUESTIONS, (questionsServeur: any) => {
            this.questions = questionsServeur.questions;
            if(this.questions) {
                this.questionSuivante();
            }
        });*/
        this.socket.on(SERVER_EVENTS.NEXT_QUESTIONS, (questionServeur: Question) => {
            this.question = questionServeur
            console.log("NEXT QUESTIONS : " + JSON.stringify(this.question));
        });
    }

    repondre(reponse: number) {
        console.log("POST REPONSE : " + reponse.toString());
        this.socket.emit(CLIENT_EVENTS.REPONSE_QUESTION, reponse);
    }
}