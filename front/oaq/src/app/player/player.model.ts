export interface Player {
    nom: string;
    score: number;
    position: number;
}

export interface Questions {
    question: Question[];
}

export  interface Question {
    titre: string;
    questionLabel: string;
    reponses: Reponses;
}

export interface Reponses {
    reponse: Reponse[];
}

export interface Reponse {
    reponseLabel: string
}