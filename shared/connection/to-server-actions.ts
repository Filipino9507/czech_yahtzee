/**
 * TSA = To Server Actions
 */

const BASE = "server/";

export namespace MatchmakerTSA {
    export const ADD_PLAYER_TO_NEW_ROOM = BASE + "addPlayerToNewRoom";
    export const ADD_PLAYER_TO_EXISTING_ROOM = BASE + "addPlayerToExistingRoom";
    export const REMOVE_PLAYER_FROM_EXISTING_ROOM = BASE + "removePlayerFromExistingRoom";
}

export namespace GameTSA {

}
