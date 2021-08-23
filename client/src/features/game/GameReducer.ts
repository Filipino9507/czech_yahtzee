import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import Game from "cys/models/game/game";
import { getDefaultPlayer } from "cys/models/game/player";
import { DiceRollState } from "cys/models/game/dice";
import { GameTSA } from "cys/connection/to-server-actions";

/**
 * State
 */
export type GameState = Game;

const initialState: GameState = {
    playerCount: 2,
    playerTurn: 0,
    players: [],
    // players: [getDefaultPlayer("GUEST1", ""), getDefaultPlayer("GUEST2", "")],
    dice: [
        { id: 0, value: 1, rollState: "IDLE", selected: false },
        { id: 1, value: 1, rollState: "IDLE", selected: false },
        { id: 2, value: 1, rollState: "IDLE", selected: false },
        { id: 3, value: 1, rollState: "IDLE", selected: false },
        { id: 4, value: 1, rollState: "IDLE", selected: false },
        { id: 5, value: 1, rollState: "IDLE", selected: false },
    ],
    diceCount: 6,
    roomId: "",
};

/**
 * Selectors
 */
export const diceSelector =
    (options: { rollState?: DiceRollState; selected?: boolean, sorted?: boolean }) => (state: RootState) => {
        const { rollState, selected, sorted } = options;
        let dice = rollState
            ? state.game.dice.filter((d) => d.rollState === rollState)
            : state.game.dice;
        dice = selected ? dice.filter((d) => d.selected === selected) : dice;
        dice = sorted ? [...dice].sort((a, b) => a.value - b.value) : dice;
        return dice;
    };
export const roomIdSelector = (state: RootState) => state.game.roomId;

export const canPlaySelector = (playerIdx: number) => (state: RootState) =>
    state.game.playerTurn === playerIdx;
export const playerSelector = (playerIdx: number) => (state: RootState) =>
    state.game.players[playerIdx];
export const currentPlayerSelector = (state: RootState) =>
    state.game.players[state.game.playerTurn];
export const playersSelector = (state: RootState) => state.game.players;

/**
 * Actions
 */
export const rollDice = createAction<{
    roomId: string;
}>(GameTSA.ROLL_DICE);
export const toggleSelectDice = createAction<{
    roomId: string;
    diceId: number;
}>(GameTSA.TOGGLE_SELECT_DICE);
export const lockInDice = createAction<{
    roomId: string;
    lockedIn: boolean;
}>(GameTSA.LOCK_IN_DICE);
export const finishTurn = createAction<{
    roomId: string;
}>(GameTSA.FINISH_TURN);

/**
 * Slice
 */
const GameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        // To-client socket.io actions
        provideGameState(_: GameState, action: PayloadAction<Game>) {
            return { ...action.payload };
        },
        unselectAllDice(state: GameState) {
            for (const dice of state.dice) {
                dice.selected = false;
            }
        },
    },
    extraReducers: {},
});

export default GameSlice.reducer;
