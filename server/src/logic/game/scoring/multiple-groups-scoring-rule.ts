import ScoringRule from "./scoring-rule";
import { DiceValue } from "cys/models/game/dice";
import { ScoreboardDataKey } from "cys/models/game/score";

export default class MultipleGroupsScoringRule extends ScoringRule {
    private groupSize: number;

    public constructor(name: ScoreboardDataKey, groupSize: number) {
        super(name);
        this.groupSize = groupSize;
    }

    public override calculateScore(diceValues: DiceValue[]): number {
        const valueCounts = ScoringRule.getValueCounts(diceValues);
        for (const value of Array.from(valueCounts.keys())) {
            let count;
            do {
                count = valueCounts.get(value) as number;
                valueCounts.set(value, count - this.groupSize);
            } while (count > 0);
            if (count !== 0) {
                return 0;
            }
        }
        return diceValues.reduce((a, b) => a + b, 0);
    }
}
