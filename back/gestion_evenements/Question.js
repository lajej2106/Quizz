const questionsJson = require('../questions.json');

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
        indexQuestion++;
        if(indexQuestion >= questionsJson.questions.length) {
            console.log('!!!!!!!!! Fin du JEU !!!!!!!!!!');
            io.emit('showResults');
            io.emit('endGames');
        } else {
            io.emit('navigueVersDiapo');
            console.log(`Question suivante index : ${indexQuestion.toString()}`);
            io.emit('nextQuestions', questionsJson.questions[indexQuestion]);
            compteARebour(socket, io);
        }
    });
};

const reponseQuestion = (socket, io, joueurs) => {
    socket.on('postReponseQuestion', (reponseQuestion) => {
        const nomJoueur = socket.handshake.query.nomJoueur;
        console.log('Score : ' + nomJoueur);
        if (joueurs.map(joueur => joueur.nom).includes(nomJoueur)) {
            for (const i in joueurs) {
                let joueur = joueurs[i];
                if (joueur.nom === nomJoueur) {
                    const resultats = questionsJson.questions[indexQuestion].resultats;
                    for (const y in resultats) {
                        if (reponseQuestion === resultats[y].resultatLabel) {
                            if (compteur != 0) {
                                joueur.score = joueur.score + 9 * compteur
                            } else {
                                joueur.score = joueur.score + 5;
                            }
                            io.emit('joueurRepondu', joueur);
                        }
                    }
                }
            }
        } else {
            socket.emit('PlayerIntrouvable', buildError('E003', 'Joueur introuvable'));
        }
    });
};

const compteARebour = (socket, io) => {
    compteur = 20;
    var x = setInterval(() => {
        if (compteur >= 0) {
            console.log('compteur : ' + compteur.toString());
            io.emit('compteARebour', compteur);
            if (compteur != 0) {
                compteur--;
            } else
                clearInterval(x);
        }
    }, 1000);
};