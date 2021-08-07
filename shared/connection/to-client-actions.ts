/**
 * TCA = To Client Actions
 */

export namespace MatchmakerTCA {
    const BASE = "matchmaker/";

    export const PROVIDE_ROOM_META = BASE + "provideRoomMeta";
    export const SET_IN_GAME_STATUS = BASE + "setInGameStatus";
    
    export const ERROR = BASE + "error";
}

export namespace GameTCA {
    const BASE = "game/";

    export const PROVIDE_GAME_STATE = BASE + "provideGameState";

    export const ERROR = BASE + "error";
}

export namespace MiscTCA {
    const BASE = "misc/";

    export const ERROR = BASE + "error";
}
