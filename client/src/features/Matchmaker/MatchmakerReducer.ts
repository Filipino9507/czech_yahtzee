import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { MatchmakerTSA } from "cys/connection/to-server-actions";

/**
 * State
 */
export interface MatchmakerState {
    inGame: boolean;
    roomId: string | null;
    playerIdx: number | null;
    errorMessage: string;
}

const initialState: MatchmakerState = {
    inGame: false,
    roomId: null,
    playerIdx: null,
    errorMessage: "",
};

/**
 * Selectors
 */
export const roomIdSelector = (state: RootState) => state.matchmaker.roomId;
export const playerIdxSelector = (state: RootState) => state.matchmaker.playerIdx;
export const inGameSelector = (state: RootState) => state.matchmaker.inGame;

/**
 * Actions
 */
export const requestStoredGame = createAction<{
    roomId: string;
    playerId: string;
}>(MatchmakerTSA.REQUEST_STORED_GAME);
export const addPlayerToNewRoom = createAction<{
    userId?: string;
}>(MatchmakerTSA.ADD_PLAYER_TO_NEW_ROOM);
export const addPlayerToExistingRoom = createAction<{
    roomId: string;
    userId?: string;
}>(MatchmakerTSA.ADD_PLAYER_TO_EXISTING_ROOM);
export const removePlayerFromExistingRoom = createAction<{
    roomId: string | null;
}>(MatchmakerTSA.REMOVE_PLAYER_FROM_EXISTING_ROOM);

/**
 * Slice
 */
const MatchmakerSlice = createSlice({
    name: "matchmaker",
    initialState,
    reducers: {
        // To-client socket.io actions
        provideRoomMeta(
            state: MatchmakerState,
            action: PayloadAction<{
                roomId: string;
                playerIdx: number;
            }>
        ) {
            const { roomId, playerIdx } = action.payload;
            state.roomId = roomId;
            state.playerIdx = playerIdx;
        },
        setInGameStatus(state: MatchmakerState, action: PayloadAction<boolean>) {
            state.inGame = action.payload;
        },
        error(state: MatchmakerState, action: PayloadAction<string>) {
            const errorMessage = action.payload;
            state.errorMessage = errorMessage;
            alert(errorMessage);
        },
    },
    extraReducers: {},
});

export default MatchmakerSlice.reducer;
