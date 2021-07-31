import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { MatchmakerTSA } from "cys/connection/to-server-actions";

export interface MatchmakerState {
    roomId: string | null;
    errorMessage: string;
}

const initialState = {
    roomId: null,
    errorMessage: "",
} as MatchmakerState;

export const roomIdSelector = (state: RootState) => state.matchmaker.roomId;

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
        provideRoomId(state: MatchmakerState, action: PayloadAction<string>) {
            state.roomId = action.payload;
        },
        startGame(state: MatchmakerState) {
            /**
             * Start the game (need to figure out how
             * to do this in the other reducer)
             */
            alert("Game started...");
        },

        error(state: MatchmakerState, action: PayloadAction<string>) {
            const errorMessage = action.payload;
            state.errorMessage = errorMessage;
            alert(errorMessage);
        }
    },
    extraReducers: {},
});

export const { provideRoomId } = MatchmakerSlice.actions;

export default MatchmakerSlice.reducer;
