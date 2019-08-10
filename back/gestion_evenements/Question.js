const questionsJson = require('../questions.json');

let indexQuestion = 0;
let compteur =

module.exports = {
    Question: function (app, socket, io, joueurs) {

        envoyerQuestion(socket, io);
        reponseQuestion(socket, joueurs);


    }
};

const envoyerQuestion = (socket, io) => {
    socket.on('broadcastQuestionNext', () => {
        indexQuestion++;
        console.log(`Question suivante index : ${indexQuestion.toString()}`);
        io.emit('nextQuestions', questionsJson.questions[indexQuestion]);
        compteARebour(socket);
    });
};

const reponseQuestion = (socket, joueurs) => {
    socket.on('postReponseQuestion', (reponseQuestion) => {
        const nomJoueur = socket.handshake.query.playerName;
        if (joueurs.map(joueur => joueur.nom).includes(nomJoueur)) {
            for (const i in joueurs) {
                let joueur = joueurs[i];
                if(joueur.nom === socket.handshake.query.playerName) {
                    const resultats = questionsJson.questions[indexQuestion].resultats;
                    for (const y in resultats){
                        if (reponseQuestion === resultats[y].resultatLabel) {
                            joueur.score = joueur.score + 9*compteur;
                        }
                    }
                }
            }
        } else {
            socket.emit('PlayerIntrouvable', buildError('E003', 'Joueur introuvable'));
        }
    });
};

const compteARebour = (socket) => {
    compteur = 20;
    var x = setInterval(() => {
        if(compteur>0){
            console.log('compteur : ' + compteur.toString());
            socket.emit('compteARebour', compteur);
            compteur--;
        } else {
            clearInterval(x);
    }}, 1000);
};