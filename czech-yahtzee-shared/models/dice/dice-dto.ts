import DiceValue from "./dice-value";
import DiceRollState from "./dice-roll-state";

export default interface DiceDTO {
    id: number;
    value: DiceValue;
    rollState: DiceRollState;
}