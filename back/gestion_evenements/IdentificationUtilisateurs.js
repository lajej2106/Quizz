module.exports = {
    IdentificationUtilisateurs: function(app, socket, io, joueurs) {
        gestionConnexion(socket);
        connexionNouveauJoueur(socket, io, joueurs);
        recuperationConnexionJoueur(socket, io, joueurs);
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

const connexionNouveauJoueur = (socket, io, joueurs) => {
    socket.on('newPlayer', (infoJoueur) => {
        if (infoJoueur) {
            const nomJoueur = infoJoueur[0];
            const equipeJoueur = infoJoueur[1];
            if (!joueurs.map(nomJoueur => nomJoueur.nom).includes(nomJoueur)) {
                console.log(`Ajout de l'utilisateur ${nomJoueur} équipe ${equipeJoueur}`);
                ajoutJoueur(socket, io, joueurs, nomJoueur, equipeJoueur)
            } else {
                socket.emit('newPlayerError', buildError('E002', 'Joueur déjà connu'));
            }
        } else {
            socket.emit('newPlayerError', buildError('E001', 'Mauvais paramètre'));
        }
    });
};

const recuperationConnexionJoueur = (socket, io, joueurs) => {
    const infoJoueur = getSocketIdentification(socket);
    console.log('Récupèration : ' + infoJoueur);
    const Joueur = infoJoueur.split('¤');
    const nomJoueur = Joueur[0];
    const equipeJoueur = Joueur[1];
    if (!joueurs.map(player => player.nom).includes(nomJoueur)) {
        if (socket.handshake.query.playerName) {
            console.log(`Récupèration de l'utilisateur ${nomJoueur} - ${equipeJoueur}`);
            ajoutJoueur(socket, io, joueurs, nomJoueur, equipeJoueur)
        }
    }
};

const ajoutJoueur = (socket, io, joueurs, nomJoueur, equipe) => {
    const nouveauJoueur = {nom: nomJoueur, score: 0, equipe: equipe};
    joueurs.push(nouveauJoueur);
    socket.handshake.query.nomJoueur = nomJoueur + '¤' + equipe;
    console.log('new Player : ' + JSON.stringify(nouveauJoueur));
    io.emit('newPlayerSuccess', nouveauJoueur);
};