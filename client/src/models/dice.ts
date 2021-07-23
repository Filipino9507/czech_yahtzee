export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export type DiceRollState = "IDLE" | "ROLLED" | "LOCKED_IN" | "DISABLED";

export default interface Dice {
    id: number;
    value: DiceValue;
    rollState: DiceRollState;
    selected: boolean;
}