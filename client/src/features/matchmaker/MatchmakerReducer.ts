import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { MatchmakerTSA } from "cys/connection/to-server-actions";
import GameStatus from "cys/models/game/game-status";

/**
 * State
 */
export interface MatchmakerState {
    gameStatus: GameStatus;
    isHost: boolean;
    roomId: string | null;
    playerCount: number;
    currentPlayerCount: number;
    playerIdx: number | null;
}

const initialState: MatchmakerState = {
    gameStatus: "IDLE",
    isHost: false,
    roomId: null,
    playerCount: 0,
    currentPlayerCount: 0,
    playerIdx: null,
};

/**
 * Selectors
 */
export const roomIdSelector = (state: RootState) => state.matchmaker.roomId;
export const playerIdxSelector = (state: RootState) => state.matchmaker.playerIdx;
export const gameStatusSelector = (state: RootState) => state.matchmaker.gameStatus;
export const playerCountSelector = (state: RootState) => state.matchmaker.playerCount;
export const currentPlayerCountSelector = (state: RootState) => state.matchmaker.currentPlayerCount;
export const isNonHostWaitingSelector = (state: RootState) =>
    !state.matchmaker.isHost && state.matchmaker.gameStatus === "WAITING";

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
export const startGame = createAction<{
    roomId: string;
}>(MatchmakerTSA.START_GAME);
export const removePlayerFromExistingRoom = createAction<{
    roomId: string | null;
}>(MatchmakerTSA.REMOVE_PLAYER_FROM_EXISTING_ROOM);
export const setPlayerCount = createAction<{
    roomId: string;
    newPlayerCount: number;
}>(MatchmakerTSA.SET_PLAYER_COUNT);

/**
 * Slice
 */
const MatchmakerSlice = createSlice({
    name: "matchmaker",
    initialState,
    reducers: {
        setGameStatusIdle(state: MatchmakerState) {
            state.gameStatus = "IDLE";
        },
        // To-client socket.io actions
        provideRoomData(
            state: MatchmakerState,
            action: PayloadAction<{
                roomId: string;
                playerCount: number;
                currentPlayerCount: number;
            }>
        ) {
            const { roomId, playerCount, currentPlayerCount } = action.payload;
            state.roomId = roomId;
            state.playerCount = playerCount;
            state.currentPlayerCount = currentPlayerCount;
        },
        providePlayerData(
            state: MatchmakerState,
            action: PayloadAction<{
                playerIdx: number;
                isHost: boolean;
            }>
        ) {
            const { playerIdx, isHost } = action.payload;
            state.playerIdx = playerIdx;
            state.isHost = isHost;
        },
        provideGameStatus(state: MatchmakerState, action: PayloadAction<GameStatus>) {
            state.gameStatus = action.payload;
        },
        error(state: MatchmakerState, action: PayloadAction<string>) {
            const errorMessage = action.payload;
            alert(errorMessage);
        },
    },
    extraReducers: {},
});

export const { setGameStatusIdle } = MatchmakerSlice.actions;
export default MatchmakerSlice.reducer;
