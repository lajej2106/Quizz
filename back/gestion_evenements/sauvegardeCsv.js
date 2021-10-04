const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = {
    ecrireNouveauScore: function (question) {
        ecrireNouveauScore(question);
        enregistrerReponse(null, null, null, null, question);
    },
    enregistrerReponse: function (joueur, reponseQuestion, compteur, scoreQuestion) {
        enregistrerReponse(joueur, reponseQuestion, compteur, scoreQuestion, null);
    }
};

let ecritureScore
let enregistrementScore;

function ecrireNouveauScore(question) {

    if (ecritureScore) {
        ecrireScore(enregistrementScore);
    }

    let titre = question.titre;
    ecritureScore = createCsvWriter({
        path: 'C:\\serveurReponseMariage\\' + titre + '.csv',
        header: [
            {id: 'nom', title: 'Nom'},
            {id: 'equipe', title: 'Equipe'},
            {id: 'reponse', title: 'Reponse'},
            {id: 'tempsReponse', title: 'Temps_de_réponse'},
            {id: 'score', title: 'Score_pour_la_question'},
            {id: 'total', title: 'Score_total'},
            {id: 'question', title: 'Question_posé'},
            {id: 'bonneReponse', title: 'Bonne_réponse'},
            {id: 'reponse1', title: 'reponse 1'},
            {id: 'reponse2', title: 'reponse 2'},
            {id: 'reponse3', title: 'reponse 3'},
            {id: 'reponse4', title: 'reponse 4'}
        ]
    });
}

function enregistrerReponse(joueur, reponseQuestion, compteur, scoreQuestion, question) {

    let vide = 'aucune info';
    if (question == null) {
        enregistrementScore.push({
            nom: joueur.nom,
            equipe: joueur.equipe,
            tempsReponse: reponseQuestion,
            score: scoreQuestion,
            total: joueur.score
        });
    } else {
        let bonneReponse = question.resultats[0].resultatLabel;
        let reponse1 = question.reponses[0].reponseLabel;
        let reponse2 = question.reponses[1].reponseLabel;
        let reponse3 = question.reponses[2].reponseLabel;
        let reponse4 = question.reponses[3].reponseLabel;
        enregistrementScore = [{
            question: question.questionLabel,
            bonneReponse: bonneReponse,
            reponse1: reponse1,
            reponse2: reponse2,
            reponse3: reponse3,
            reponse4: reponse4
        }];
    }
}

function ecrireScore(enregistrement) {
    ecritureScore.writeRecords(enregistrement);
}

