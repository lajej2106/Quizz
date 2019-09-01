export const URL_SERVER = "192.168.1.17:1337";

export interface IServerEvents {
    NEW_PLAYER_SUCCESS,
    NEW_PLAYER_ERROR,
    GAME_START,
    QUESTIONS,
    NEXT_QUESTIONS,
    COMPTE_A_REBOUR,
    JOUEUR_REPONDU
}

export interface IClientEvents {
    NEW_PLAYER,
    GET_PLAYERS,
    REPONSE_QUESTION
}

export const SERVER_EVENTS: IServerEvents = {
    NEW_PLAYER_SUCCESS: 'newPlayerSuccess',
    NEW_PLAYER_ERROR: 'newPlayerError',
    GAME_START: 'gameStart',
    QUESTIONS: 'questions',
    NEXT_QUESTIONS: 'nextQuestions',
    COMPTE_A_REBOUR: 'compteARebour',
    JOUEUR_REPONDU: 'joueurRepondu'
};

export const CLIENT_EVENTS: IClientEvents = {
    NEW_PLAYER: 'newPlayer',
    GET_PLAYERS: 'getPlayers',
    REPONSE_QUESTION: 'postReponseQuestion'
};
