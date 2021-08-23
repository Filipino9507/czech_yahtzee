import { createSlice, createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Player, ScoreboardData, Dice, DiceValue, DiceRollState, Loading } from "app/models";
import { RootState } from "app/store";
import PlayerDTO from "czech-yahtzee-shared/models/player/player-dto";

interface GameState {
    /**
     * Part of GameDTO
     */
    playerCount: number;
    playerTurn: number;
    playerStates: Player[];

    dice: Dice[];
    selectedDice: Dice[];

    loadingStates: {
        getRollsLoading: Loading;
        getGame: Loading;
    };
}

const initialState = {
    playerCount: 2,
    playerTurn: 0,
    playerStates: [
        {
            rolls: 3,
            extraRolls: 0,
            scoreboardData: {} as ScoreboardData,
        },
        {
            rolls: 0,
            extraRolls: 0,
            scoreboardData: {} as ScoreboardData,
        },
    ],
    dice: [
        { id: 0, value: 1, rollState: "IDLE", selected: false },
        { id: 1, value: 1, rollState: "IDLE", selected: false },
        { id: 2, value: 1, rollState: "IDLE", selected: false },
        { id: 3, value: 1, rollState: "IDLE", selected: false },
        { id: 4, value: 1, rollState: "IDLE", selected: false },
        { id: 5, value: 1, rollState: "IDLE", selected: false },
    ],
    selectedDice: [],
    loadingStates: {
        getRollsLoading: Loading.IDLE,
        getGame: Loading.IDLE,
    },
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

export const addPlayerToNewRoom = createAction<PlayerDTO>("server/addPlayerToNewRoom");
export const addPlayerToExistingRoom = createAction<[PlayerDTO, string]>(
    "server/addPlayerToExistingRoom"
);
export const removePlayerFromExistingRoom = createAction<string>(
    "server/removePlayerFromExistingRoom"
);
export const { toggleSelectDice } = GameSlice.actions;

export default GameSlice.reducer;
