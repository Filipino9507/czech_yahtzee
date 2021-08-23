import ScoringRule from "./scoring-rule";
import { DiceValue } from "cys/models/game/dice";
import { ScoreboardDataKey } from "cys/models/game/score";

type Predicate = (diceValue: DiceValue) => boolean;
export default class PredicateScoringRule extends ScoringRule {
    private predicate: Predicate;

    public constructor(name: ScoreboardDataKey, predicate: Predicate) {
        super(name);
        this.predicate = predicate;
    }

    public calculateScore(diceValues: DiceValue[]): number {
        let result = 0;
        for (const value of diceValues) {
            if (this.predicate(value)) {
                result += value;
            }
        }
        return result;
    }
}
