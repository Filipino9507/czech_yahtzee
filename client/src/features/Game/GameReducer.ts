import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Player, { Scoreboard } from "models/player";
import Loading from "models/loading";
import Dice, { DiceValue, DiceRollState } from "models/dice";
import { RootState } from "app/store";

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
            scoreboard: {} as Scoreboard,
        },
        {
            rolls: 0,
            extraRolls: 0,
            scoreboard: {} as Scoreboard,
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

const getRollsAsync = createAsyncThunk("game/getRollsAsync", async (rollCount: number, _) => {
    let rolls = new Array<DiceValue>(rollCount);
    for (let i = 0; i < rollCount; ++i) {
        rolls[i] = ((Math.random() % 6) + 1) as DiceValue;
    }
    return rolls;
});

const getGame = createAsyncThunk("game/getGame", async (id: string) => {
    throw new Error("Not implemented.");
});

const GameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        toggleSelectDice(
            state: GameState,
            action: PayloadAction<{ id: number; selected: boolean }>
        ) {
            const { id, selected } = action.payload;
            const dice = state.dice.find((d) => d.id === id);
            if (dice) dice.selected = selected;
        },
    },
    extraReducers: {
        [getRollsAsync.pending.type]: (state: GameState) => {
            state.loadingStates.getRollsLoading = Loading.PENDING;
        },
        [getRollsAsync.fulfilled.type]: (state: GameState, action: PayloadAction<DiceValue[]>) => {
            const rolls = action.payload;
            const selectedDice = getSelectedDice(state);
            for (let i = 0; i < rolls.length && i < selectedDice.length; ++i) {
                selectedDice[i].value = rolls[i];
                selectedDice[i].rollState = "ROLLED";
            }
            state.loadingStates.getRollsLoading = Loading.FULLFILLED;
        },
        [getRollsAsync.rejected.type]: (state: GameState) => {
            state.loadingStates.getRollsLoading = Loading.REJECTED;
        },
    },
});

export const getSelectedDice = (state: GameState) => state.dice.filter((d) => d.selected);

export const diceSelector = (rollState?: DiceRollState) => (state: RootState) => {
    if(!rollState)
        return state.game.dice;
    return state.game.dice.filter(d => d.rollState === rollState);
};

export default GameSlice.reducer;
export const {} = GameSlice.actions;
