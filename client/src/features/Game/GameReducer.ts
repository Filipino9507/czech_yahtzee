import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { GameDTOSerializable } from "cys/models/game/game-dto";
import Player, { PlayerSerializable } from "cys/models/game/player";
import Dice from "cys/models/game/dice";
import DiceRollState from "cys/models/game/dice-roll-state";

export type DiceState = Dice & { selected: boolean };

export interface GameState {
    playerCount: number;
    playerTurn: number;
    playerStates: PlayerSerializable[];
    diceCount: number;
    dice: DiceState[];
}

const initialState = {
    playerCount: 2,
    playerTurn: 0,
    playerStates: [new Player("").toSerializable(), new Player("").toSerializable()],
    dice: [
        { id: 0, value: 1, rollState: "IDLE", selected: false },
        { id: 1, value: 1, rollState: "IDLE", selected: false },
        { id: 2, value: 1, rollState: "IDLE", selected: false },
        { id: 3, value: 1, rollState: "IDLE", selected: false },
        { id: 4, value: 1, rollState: "IDLE", selected: false },
        { id: 5, value: 1, rollState: "IDLE", selected: false },
    ],
} as GameState;

const GameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        // To-client socket.io actions
        provideGameState(state: GameState, action: PayloadAction<GameDTOSerializable>) {
            const gameState = action.payload;
            const dice = gameState.dice.map((d, idx) => ({
                ...d,
                selected: state.dice[idx].selected,
            }));
            state = { ...gameState, dice };
        },
        // Local actions
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

export const { toggleSelectDice } = GameSlice.actions;

export default GameSlice.reducer;
