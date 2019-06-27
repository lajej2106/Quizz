var express = require('express');
var bodyParser = require('body-parser');

const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const players = [];

const buildError = (codeErr, msgErr) => {
    return {code:codeErr, msg: msgErr};
}

io.on('connection', (socket) => {
    console.log('on connection');
    socket.emit('request', /* */); // emit an event to the socket
    io.emit('broadcast', /* */); // emit an event to all connected sockets
    socket.on('reply', function(){ console.log('LISTEN TO REPLY'); }); // listen to the event
    socket.on('disconnect', function(){ console.log('USER DISCONNECTED'); });
    socket.on('newPlayer', (playerName) => {
        console.log('NEW PLAYER', playerName);
        socket.emit('connected');
    });

    socket.on('broadcastToAll', (msg) => {io.emit("globalMessage", msg)});
})

// gerer comme il faut par socket
app.post("/api/saveplayer", (req, res) => {
    const playerName = req.body.nom;
    if (playerName) {
        if (!players.includes(playerName)) {
            players.push(playerName);
            res.send(true);
        } else {
            res.status(400).send(buildError('E002', 'Joueur déjà connu'));
        }
    } else {
        res.status(400).send(buildError('E001', 'Mauvais paramètre'));
    }
});

app.get("/api/players", (req, res) => {
    res.json(players);
});




const port = 1337;
server.listen(port, () => {
    console.log("Express Node.js server running on port " + port);
})