const questionsJson = require('../questions.json');
const sauvegarde = require('./sauvegardeCsv.js');

let topResponse = false;
let indexQuestion = 0;
let compteur =

    module.exports = {
        Question: function (app, socket, io, joueurs) {

            envoyerQuestion(socket, io);
            reponseQuestion(socket, io, joueurs);
        }
    };

const envoyerQuestion = (socket, io) => {
    socket.on('broadcastQuestionNext', () => {
        if(!topResponse || indexQuestion === 0) {
            indexQuestion++;
        }
        if (indexQuestion >= questionsJson.questions.length) {
            console.log('!!!!!!!!! Fin du JEU !!!!!!!!!!');
            io.emit('showResults');
            io.emit('endGames');
        } else {
            if (topResponse) {
                io.emit('goResponse');
                console.log(`Go pour repondre`);
                compteARebour(socket, io);
                topResponse = false;
            } else {
                io.emit('navigueVersDiapo');
                console.log(`Question index : ${indexQuestion.toString()}`);
                io.emit('nextQuestions', questionsJson.questions[indexQuestion]);
                topResponse = true;
                sauvegarde.ecrireNouveauScore(questionsJson.questions[indexQuestion]);
            }
        }
    });
};

const reponseQuestion = (socket, io, joueurs) => {
    socket.on('postReponseQuestion', (reponseQuestion) => {
        const nomJoueur = socket.handshake.query.nomJoueur;
        if (joueurs.map(joueur => joueur.nom).includes(nomJoueur)) {
            for (const i in joueurs) {
                let joueur = joueurs[i];
                if (joueur.nom === nomJoueur) {
                    let bonneReponse = false;
                    const resultats = questionsJson.questions[indexQuestion].resultats;
                    let scoreQuestion = 0;
                    for (const y in resultats) {
                        if (reponseQuestion === resultats[y].resultatLabel) {
                            if (compteur != 0) {
                                scoreQuestion = 9 * compteur;
                            } else {
                                scoreQuestion = 5;
                            }
                            joueur.score = joueur.score + scoreQuestion;
                            bonneReponse = true;
                        }
                    }
                    io.emit('joueurRepondu', joueur, bonneReponse);
                    sauvegarde.enregistrerReponse(joueur, reponseQuestion, compteur, scoreQuestion);
                }
            }
        } else {
            try {
                socket.emit('PlayerIntrouvable', buildError('E003', 'Joueur introuvable'));
            } catch (e) {
                console.log('Exception : ', e);
            }
        }
    });
};

const compteARebour = (socket, io) => {
    compteur = 1;
    var x = setInterval(() => {
        if (compteur >= 0) {
            io.emit('compteARebour', compteur);
            if (compteur != 0) {
                compteur--;
            } else
                clearInterval(x);
        }
    }, 1000);
};
