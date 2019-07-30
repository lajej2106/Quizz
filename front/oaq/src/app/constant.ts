export const URL_SERVER = "localhost:1337";

export interface IServerEvents {
    NEW_PLAYER_SUCCESS,
    NEW_PLAYER_ERROR,
    GAME_START,
    QUESTIONS,
    NEXT_QUESTIONS
}

export interface IClientEvents {
    NEW_PLAYER,
    GET_PLAYERS
}

export const SERVER_EVENTS: IServerEvents = {
    NEW_PLAYER_SUCCESS: 'newPlayerSuccess',
    NEW_PLAYER_ERROR: 'newPlayerError',
    GAME_START: 'gameStart',
    QUESTIONS: 'questions',
    NEXT_QUESTIONS: 'nextQuestions'
}

export const CLIENT_EVENTS: IClientEvents = {
    NEW_PLAYER: 'newPlayer',
    GET_PLAYERS: 'getPlayers'
}