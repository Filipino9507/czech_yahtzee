/**
 * TSA = To Server Actions
 */

const BASE = "server/";

export namespace MatchmakerTSA {
    export const REQUEST_STORED_GAME = BASE + "requestStoredGame";
    export const ADD_PLAYER_TO_NEW_ROOM = BASE + "addPlayerToNewRoom";
    export const ADD_PLAYER_TO_EXISTING_ROOM = BASE + "addPlayerToExistingRoom";
    export const START_GAME = BASE + "startGame";
    export const REMOVE_PLAYER_FROM_EXISTING_ROOM = BASE + "removePlayerFromExistingRoom";
    export const SET_PLAYER_COUNT = BASE + "setPlayerCount";
}

export namespace GameTSA {
    export const ROLL_DICE = BASE + "rollDice";
    export const TOGGLE_LOCK_IN_DICE = BASE + "toggleLockInDice";
    export const FINISH_TURN = BASE + "finishTurn";
}
