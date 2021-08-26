import ScoringRule from "./scoring-rule";
import { DiceValue } from "cys/models/game/dice";

export default class RunScoringRule extends ScoringRule {
    public override calculateScore(diceValues: DiceValue[]) {
        const visited = new Array(6).fill(false);
        for (let i = 0; i < 6; ++i) {
            if (visited[diceValues[i] - 1]) {
                return 0;
            }
            visited[diceValues[i] - 1] = true;
        }
        return 21;
    }
}
