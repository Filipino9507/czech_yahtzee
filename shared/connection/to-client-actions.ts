/**
 * TCA = To Client Actions
 */

export namespace MatchmakerTCA {
    const BASE = "matchmaker/";

    export const PROVIDE_ROOM_ID = BASE + "provideRoomId";
    export const START_GAME = BASE + "startGame";
    
    export const ERROR = BASE + "error";
}

export namespace GameTCA {
    const BASE = "game/";
}

export namespace MiscTCA {
    const BASE = "misc/";

    export const ERROR = BASE + "error";
}
