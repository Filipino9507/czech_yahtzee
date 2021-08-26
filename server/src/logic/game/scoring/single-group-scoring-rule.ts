import ScoringRule from "./scoring-rule";
import { DiceValue } from "cys/models/game/dice";
import { ScoreboardDataKey } from "cys/models/game/score";

export default class SingleGroupScoringRule extends ScoringRule {
    private groupSize: number;

    public constructor(name: ScoreboardDataKey, groupSize: number) {
        super(name);
        this.groupSize = groupSize;
    }

    public override calculateScore(diceValues: DiceValue[]): number {
        const valueCounts = ScoringRule.getValueCounts(diceValues);
        for (const value of Array.from(valueCounts.keys())) {
            const count = valueCounts.get(value) as number;
            if (count >= this.groupSize) {
                return this.groupSize * value;
            }
        }
        return 0;
    }
}
