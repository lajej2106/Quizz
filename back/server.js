const IU = require('./gestion_evenements/IdentificationUtilisateurs.js');
const Q = require('./gestion_evenements/Question.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const joueurs = [];

io.on('connection', (socket) => {
    try {
        gestionEvenement(socket);

        socket.on('goToResults', () => {
            io.emit('showResults');
        });
    } catch (e) {
        console.log('Exception non traiter : ', e)
    }
});


const gestionEvenement = (socket) => {
    identificationUtilisateurs: new IU.IdentificationUtilisateurs(app, socket, io, joueurs);
    question: new Q.Question(app, socket, io, joueurs);
};


const port = 1337;
server.listen(port, () => {
    console.log("Express Node.js server running on port " + port);
});
