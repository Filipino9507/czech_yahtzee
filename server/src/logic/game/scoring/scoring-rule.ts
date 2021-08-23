import { DiceValue } from "cys/models/game/dice";
import { ScoreboardData } from "cys/models/game/score";

export type ScoringRuleName = keyof ScoreboardData;
export default abstract class ScoringRule {
    public name: ScoringRuleName;

    public constructor(name: ScoringRuleName) {
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
