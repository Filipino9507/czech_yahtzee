import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import Game from "cys/models/game/game";
import { DiceRollState } from "cys/models/game/dice";
import { GameTSA } from "cys/connection/to-server-actions";
import { ScoreboardDataKey } from "cys/models/game/score";

/**
 * State
 */
export type GameState = Game;

const initialState: GameState = {
    playerCount: 2,
    playerTurn: 0,
    players: [],
    dice: [
        { id: 0, value: 1, rollState: "IDLE" },
        { id: 1, value: 1, rollState: "IDLE" },
        { id: 2, value: 1, rollState: "IDLE" },
        { id: 3, value: 1, rollState: "IDLE" },
        { id: 4, value: 1, rollState: "IDLE" },
        { id: 5, value: 1, rollState: "IDLE" },
    ],
    diceCount: 6,
    roomId: "",
};

/**
 * Selectors
 */
export const diceSelector =
    (options: { rollState?: DiceRollState; sorted?: boolean }) =>
    (state: RootState) => {
        const { rollState, sorted } = options;
        let dice = rollState
            ? state.game.dice.filter((d) => d.rollState === rollState)
            : state.game.dice;
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
export const toggleLockInDice = createAction<{
    roomId: string;
    diceId: number;
}>(GameTSA.TOGGLE_LOCK_IN_DICE);
export const finishTurn = createAction<{
    roomId: string;
    scoringRuleName: ScoreboardDataKey;
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
    },
    extraReducers: {},
});

export default GameSlice.reducer;
