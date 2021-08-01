import Dice from "czech-yahtzee-shared/models/game/dice";

export default interface DiceState extends Dice {
    selected: boolean;
}