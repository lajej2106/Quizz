export class Joueur {
    nom: string;
    score: number;
    equipe: string
}

class Reponse {
    reponseLabel: string;
}

class Resultat {
    resultatLabel: string;
}

export class Question {
    titre: string;
    questionLabel: string;
    image: string;
    reponses: Reponse[];
    resultats: Resultat[];
}
