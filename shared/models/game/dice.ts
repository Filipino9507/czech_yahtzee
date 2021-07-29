import DiceValue from "./dice-value";
import DiceRollState from "./dice-roll-state";

export default interface Dice {
    id: number;
    value: DiceValue;
    rollState: DiceRollState;
}
