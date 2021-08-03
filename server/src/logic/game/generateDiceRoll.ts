import DiceValue from "cys/models/game/dice-value";

export default function generateDiceRoll(diceCount: number): DiceValue[] {
    const result = new Array(diceCount);
    for (let i = 0; i < diceCount; ++i) {
        result[i] = Math.floor(Math.random() * 6) + 1;
    }
    return result;
}
