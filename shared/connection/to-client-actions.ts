/**
 * TCA = To Client Actions
 */

export namespace MatchmakerTCA {
    const BASE = "matchmaker/";

    export const PROVIDE_ROOM_DATA = BASE + "provideRoomData";
    export const PROVIDE_PLAYER_DATA = BASE + "providePlayerData";
    export const PROVIDE_GAME_STATUS = BASE + "provideGameStatus";
    
    export const ERROR = BASE + "error";
}

export namespace GameTCA {
    const BASE = "game/";

    export const PROVIDE_GAME_STATE = BASE + "provideGameState";

    export const ERROR = BASE + "error";
}

export namespace AlertTCA {
    const BASE = "alert/";

    export const DISPLAY_ALERT = BASE + "displayAlert";
}

export namespace MiscTCA {
    const BASE = "misc/";

    export const ERROR = BASE + "error";
}
