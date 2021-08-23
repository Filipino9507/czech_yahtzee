import ScoringRule from "./scoring-rule";
import { DiceValue } from "cys/models/game/dice";
import { ScoreboardDataKey } from "cys/models/game/score";

export default class SingleGroupScoringRule extends ScoringRule {
    private groupSize: number;

    public constructor(name: ScoreboardDataKey, groupSize: number) {
        super(name);
        this.groupSize = groupSize;
    }

    public calculateScore(diceValues: DiceValue[]): number {
        const valueCounts = ScoringRule.getValueCounts(diceValues);
        for (const value of Array.from(valueCounts.keys())) {
            const count = valueCounts.get(value);
            if (count === this.groupSize) {
                return count * value;
            }
        }
        return 0;
    }
}
