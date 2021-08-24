export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export type DiceRollState = "IDLE" | "LOCKED_IN" | "DISABLED";

export default interface Dice {
    id: number;
    value: DiceValue;
    rollState: DiceRollState;
}

export const getDefaultDice = (id: number): Dice => ({
    id,
    value: 1,
    rollState: "IDLE",
});