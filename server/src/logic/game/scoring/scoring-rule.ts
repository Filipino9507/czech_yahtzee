import { DiceValue } from "cys/models/game/dice";
import { ScoreboardDataKey } from "cys/models/game/score";

export default abstract class ScoringRule {
    public name: ScoreboardDataKey;

    public constructor(name: ScoreboardDataKey) {
        this.name = name;
    }

    protected static getValueCounts(values: DiceValue[]): Map<DiceValue, number> {
        const valueCounts = new Map();
        for (const value of values) {
            if (!valueCounts.has(value)) {
                valueCounts.set(value, 0);
            }
            valueCounts.set(value, valueCounts.get(value) + 1);
        }
        return valueCounts;
    }

    public abstract calculateScore(diceValues: DiceValue[]): number;
}
