export interface Joueurs {
    nom: string;
    score: number;
    position: number;
    equipe: string;
}

export interface Questions {
    question: Question[];
}

export interface Resultat {
  resultatLabel: string;
}

export  interface Question {
    titre: string;
    questionLabel: string;
    reponses: Reponse[];
    resultats: Resultat[];
    image: string;
}

export interface Reponse {
    reponseLabel: string
}
