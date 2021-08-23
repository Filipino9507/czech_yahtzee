/**
 * TSA = To Server Actions
 */

const BASE = "server/";

export namespace MatchmakerTSA {
    export const REQUEST_STORED_GAME = BASE + "requestStoredGame";
    export const ADD_PLAYER_TO_NEW_ROOM = BASE + "addPlayerToNewRoom";
    export const ADD_PLAYER_TO_EXISTING_ROOM = BASE + "addPlayerToExistingRoom";
    export const REMOVE_PLAYER_FROM_EXISTING_ROOM = BASE + "removePlayerFromExistingRoom";
}

export namespace GameTSA {
    export const ROLL_DICE = BASE + "rollDice";
    export const TOGGLE_SELECT_DICE = BASE + "toggleSelectDice";
    export const LOCK_IN_DICE = BASE + "lockInDice";
    export const FINISH_TURN = BASE + "finishTurn";
}
