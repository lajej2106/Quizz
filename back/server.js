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


const buildError = (codeErr, msgErr) => {
    return {code:codeErr, msg: msgErr};
};


io.on('connection', (socket) => {

    gestionEvenement(socket);

    //socket.emit('questions', questionsJson);
    socket.on('broadcastToAll', (msg) => {console.log('Broadcast to all');io.emit('AllPlayers', msg)});

    socket.on('gameStart', () => {io.emit('gameStart')});
    socket.on('getPlayers', (callback) => {
        console.log('GET PLAYERS');
        callback(joueurs);
    });
});


const gestionEvenement = (socket) => {
    identificationUtilisateurs: new IU.IdentificationUtilisateurs(app, socket, io, joueurs);
    question: new Q.Question(app, socket, io, joueurs);
};


const port = 1337;
server.listen(port, () => {
    console.log("Express Node.js server running on port " + port);
});