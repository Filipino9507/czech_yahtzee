import {createSlice, createAction, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "app/store";
import Player from "cys/models/game/player";
import ScoreboardData from "cys/models/game/scoreboard-data";
import Dice from "cys/models/game/dice";
import DiceValue from "cys/models/game/dice-value";
import DiceRollState from "cys/models/game/dice-roll-state";

export type DiceState = Dice & { selected: boolean };
export interface GameState {
    /**
     * Part of GameDTO
     */
    playerCount: number;
    playerTurn: number;
    playerStates: Player[];

    dice: DiceState[];
}

const initialState = {
    playerCount: 2,
    playerTurn: 0,
    playerStates: [
        {
            rolls: 3,
            extraRolls: 0,
            scoreboardData: new ScoreboardData(),
        },
        {
            rolls: 0,
            extraRolls: 0,
            scoreboardData: new ScoreboardData(),
        },
    ],
    dice: [
        {id: 0, value: 1, rollState: "IDLE", selected: false},
        {id: 1, value: 1, rollState: "IDLE", selected: false},
        {id: 2, value: 1, rollState: "IDLE", selected: false},
        {id: 3, value: 1, rollState: "IDLE", selected: false},
        {id: 4, value: 1, rollState: "IDLE", selected: false},
        {id: 5, value: 1, rollState: "IDLE", selected: false},
    ],
    selectedDice: [],
} as GameState;

const GameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        toggleSelectDice(state: GameState, action: PayloadAction<number>) {
            const dice = state.dice.find((d) => d.id === action.payload);
            if (dice) dice.selected = !dice.selected;
        },
    },
    extraReducers: {},
});

export const getSelectedDice = (state: GameState) => state.dice.filter((d) => d.selected);

export const diceSelector = (rollState?: DiceRollState) => (state: RootState) => {
    if (!rollState) return state.game.dice;
    return state.game.dice.filter((d) => d.rollState === rollState);
};

export const addPlayerToNewRoom = createAction<{
    userId?: string
}>("server/addPlayerToNewRoom");
export const addPlayerToExistingRoom = createAction<{
    roomId: string;
    userId?: string;
}>(
    "server/addPlayerToExistingRoom"
);
export const removePlayerFromExistingRoom = createAction<{
    roomId: string;
}>(
    "server/removePlayerFromExistingRoom"
);
export const {toggleSelectDice} = GameSlice.actions;

export default GameSlice.reducer;
