import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { MatchmakerTSA } from "cys/connection/to-server-actions";

export interface MatchmakerState {
    inGame: boolean;
    roomId: string | null;
    errorMessage: string;
}

const initialState: MatchmakerState = {
    inGame: false,
    roomId: null,
    errorMessage: "",
};

export const roomIdSelector = (state: RootState) => state.matchmaker.roomId;
export const inGameSelector = (state: RootState) => state.matchmaker.inGame;

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
 * Reducer for tha Matchmaker component
 */
const MatchmakerSlice = createSlice({
    name: "matchmaker",
    initialState,
    reducers: {
        // To-client socket.io actions
        provideRoomId(state: MatchmakerState, action: PayloadAction<string>) {
            state.roomId = action.payload;
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
