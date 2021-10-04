module.exports = {
    IdentificationUtilisateurs: function(app, socket, io, joueurs) {
        gestionConnexion(socket);
        connexionNouveauJoueur(socket, io, joueurs);
        recuperationConnexionJoueur(socket, io, joueurs);

        socket.on('getPlayers', (callback) => {
            callback(joueurs);
        });
    }
};

const gestionConnexion = (socket) => {
    console.log(`Utilisateur ${getSocketIdentification(socket)} connecté`);

    socket.on('disconnect', () => {
        console.log(`Déconection ${getSocketIdentification(socket)}`);
    });
    socket.on('reconnect', () => {
        console.log(`Reconnection ${getSocketIdentification(socket)}`);
    });
};

const getSocketIdentification = (socket) => {
    return socket.handshake.query.nomJoueur ? socket.handshake.query.nomJoueur : socket.id;
};

const getSocketEquipe = (socket) => {
    return socket.handshake.query.equipe ? socket.handshake.query.equipe : null;
};

const connexionNouveauJoueur = (socket, io, joueurs) => {
    socket.on('newPlayer', (infoJoueur) => {

        if (infoJoueur) {
            const nomJoueur = infoJoueur[0];
            const equipeJoueur = infoJoueur[1];
            if (!joueurs.map(nomJoueur => nomJoueur.nom).includes(nomJoueur)) {
                console.log(`Ajout de l'utilisateur ${nomJoueur} équipe ${equipeJoueur}`);
                ajoutJoueur(socket, io, joueurs, nomJoueur, equipeJoueur)
            }
        }
    });
};

const recuperationConnexionJoueur = (socket, io, joueurs) => {
    const nomJoueur = getSocketIdentification(socket);
    const equipeJoueur = getSocketEquipe(socket);
    if(nomJoueur && equipeJoueur) {
        console.log('Récupèration : ' + nomJoueur + ' equipe : ' + equipeJoueur);
        if (!joueurs.map(joueur => joueur.nom).includes(nomJoueur)) {
            if (socket.handshake.query.nomJoueur) {
                console.log(`Récupèration de l'utilisateur ${nomJoueur} - ${equipeJoueur}`);
                ajoutJoueur(socket, io, joueurs, nomJoueur, equipeJoueur)
            }
        }
    }
};

const ajoutJoueur = (socket, io, joueurs, nomJoueur, equipe) => {
    const nouveauJoueur = {nom: nomJoueur, score: 0, equipe: equipe, position: 0};
    joueurs.push(nouveauJoueur);
    socket.handshake.query.nomJoueur = nomJoueur;
    socket.handshake.query.equipe = equipe;
    console.log('Ajout d\'un joueur : ' + JSON.stringify(nouveauJoueur));
    socket.emit('newPlayerSuccess', nouveauJoueur);
    io.emit('broadcastNewPlayer', nouveauJoueur);
};

const buildError = (codeErr, msgErr) => {
    return {code:codeErr, msg: msgErr};
};
