export const URL_SERVER = "localhost:1337";

export interface IServerEvents {
  NEW_PLAYER_SUCCESS,
  NEW_PLAYER_ERROR,
  GAME_START,
  QUESTIONS,
  NEXT_QUESTIONS,
  GO_RESPONSE,
  COMPTE_A_REBOUR,
  JOUEUR_REPONDU,
  BROADCAST_NOUVEAU_JOUEUR,
  END_GAMES,
  NAVIGUE_VERS_DIAPO
}

export interface IClientEvents {
  NEW_PLAYER,
  GET_PLAYERS,
  REPONSE_QUESTION,
  SHOW_RESULTS
}

export const SERVER_EVENTS: IServerEvents = {
  NEW_PLAYER_SUCCESS: 'newPlayerSuccess',
  NEW_PLAYER_ERROR: 'newPlayerError',
  GAME_START: 'gameStart',
  QUESTIONS: 'questions',
  NEXT_QUESTIONS: 'nextQuestions',
  GO_RESPONSE: 'goResponse',
  COMPTE_A_REBOUR: 'compteARebour',
  JOUEUR_REPONDU: 'joueurRepondu',
  BROADCAST_NOUVEAU_JOUEUR: 'broadcastNewPlayer',
  END_GAMES: 'endGames',
  NAVIGUE_VERS_DIAPO: 'navigueVersDiapo'
};

export const CLIENT_EVENTS: IClientEvents = {
  NEW_PLAYER: 'newPlayer',
  GET_PLAYERS: 'getPlayers',
  REPONSE_QUESTION: 'postReponseQuestion',
  SHOW_RESULTS: 'showResults'
};
