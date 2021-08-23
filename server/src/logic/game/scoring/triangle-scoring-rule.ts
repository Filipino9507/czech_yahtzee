import ScoringRule from "./scoring-rule";
import { DiceValue } from "cys/models/game/dice";
import { ScoreboardDataKey } from "cys/models/game/score";

type TriangleType = "small" | "large";
export default class TriangleScoringRule extends ScoringRule {
    private triangleType: TriangleType;

    public constructor(name: ScoreboardDataKey, triangleType: TriangleType) {
        super(name);
        this.triangleType = triangleType;
    }

    public calculateScore(diceValues: DiceValue[]): number {
        const valueCounts = ScoringRule.getValueCounts(diceValues);
        const mapValues = Array.from(valueCounts.keys());
        mapValues.sort();
        if (
            mapValues.length !== 3 ||
            mapValues[0] + 1 !== mapValues[1] ||
            mapValues[0] + 2 !== mapValues[2]
        ) {
            return 0;
        }
        const mapCounts = mapValues.map((v) => valueCounts.get(v));
        const requiredCounts = this.triangleType === "small" ? [3, 2, 1] : [1, 2, 3];
        if (
            mapCounts[0] !== requiredCounts[0] ||
            mapCounts[1] !== requiredCounts[1] ||
            mapCounts[2] !== requiredCounts[2]
        ) {
            return 0;
        }
        return (
            mapValues[0] * requiredCounts[0] +
            mapValues[1] * requiredCounts[1] +
            mapValues[2] * requiredCounts[2]
        );
    }
}
