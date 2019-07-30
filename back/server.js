var express = require('express');
var bodyParser = require('body-parser');

const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const players = [{nom: 'toto', score:0}, {nom: 'titi', score:20}, {nom: 'tata', score:10}, {nom: 'tutu', score:9}];

const buildError = (codeErr, msgErr) => {
    return {code:codeErr, msg: msgErr};
}

io.on('connection', (socket) => {
    console.log(`USER ${getSocketIdentification(socket)} CONNECTED`);

    socket.on('disconnect', function(){ console.log(`USER ${getSocketIdentification(socket)} DISCONNECTED`); });
    socket.on('reconnect', function(){ console.log(`USER ${getSocketIdentification(socket)} RECONNECTED`); });
    socket.on('newPlayer', (playerName) => {
        if (playerName) {
            if (!players.map(player => player.nom).includes(playerName)) {
                const newPlayer = {nom: playerName, score:0};
                players.push(newPlayer);
                console.log(`USER ${getSocketIdentification(socket)} RENAMED ${playerName}`);
                socket.handshake.query.playerName = playerName;
                io.emit('newPlayerSuccess', newPlayer);
            } else {
                socket.emit('newPlayerError', buildError('E002', 'Joueur déjà connu'));
            }
        } else {
            socket.emit('newPlayerError', buildError('E001', 'Mauvais paramètre'));
        }
    });

    socket.on('gameStart', () => {io.emit('gameStart')});
    socket.on('getPlayers', (callback) => { 
        console.log('GET PLAYERS');
        callback(players);
    });
});

const getSocketIdentification = (socket) => {
    return socket.handshake.query.playerName ? socket.handshake.query.playerName : socket.id;
} 

const port = 1337;
server.listen(port, () => {
    console.log("Express Node.js server running on port " + port);
})