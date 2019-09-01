export interface Joueurs {
    nom: string;
    score: number;
    position: number;
    equipe: string;
}

export interface Questions {
    question: Question[];
}

export  interface Question {
    titre: string;
    questionLabel: string;
    reponses: Reponses;
    image: string;
}

export interface Reponses {
    reponse: Reponse[];
}

export interface Reponse {
    reponseLabel: string
}
