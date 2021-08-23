import { Score, ScoreboardData } from "cys/models/game/score";
import { DiceValue } from "cys/models/game/dice";

import ScoringRule, { ScoringRuleName } from "./scoring-rule";
import MultipleGroupsScoringRule from "./multiple-groups-scoring-rule";
import PredicateScoringRule from "./predicate-scoring-rule";
import TriangleScoringRule from "./triangle-scoring-rule";
import RunScoringRule from "./run-scoring-rule";
import SingleGroupScoringRule from "./single-group-scoring-rule";

class Scoring {
    private scoringRules: ScoringRule[];

    public constructor() {
        this.scoringRules = [
            new PredicateScoringRule("ones", (v) => v === 1),
            new PredicateScoringRule("twos", (v) => v === 2),
            new PredicateScoringRule("threes", (v) => v === 3),
            new PredicateScoringRule("fours", (v) => v === 4),
            new PredicateScoringRule("fives", (v) => v === 5),
            new PredicateScoringRule("sixes", (v) => v === 6),

            new PredicateScoringRule("small", (v) => v <= 3),
            new PredicateScoringRule("large", (v) => v >= 4),
            new PredicateScoringRule("odd", (v) => v % 2 === 1),
            new PredicateScoringRule("even", (v) => v % 2 === 0),

            new MultipleGroupsScoringRule("doubles", 2),
            new MultipleGroupsScoringRule("triples", 3),
            new TriangleScoringRule("smallTriangle", "small"),
            new TriangleScoringRule("largeTriangle", "large"),

            new RunScoringRule("run"),
            new SingleGroupScoringRule("poker", 5),
            new SingleGroupScoringRule("general", 6),
        ];
    }

    public peekScores(diceValues: DiceValue[], scoreboardData: ScoreboardData) {
        for (const scoringRule of this.scoringRules) {
            const score = scoreboardData[scoringRule.name];
            if (!score.scored) {
                score.value = scoringRule.calculateScore(diceValues);
            }
        }
    }

    public setScore(scoringRuleName: ScoringRuleName, scoreboardData: ScoreboardData) {
        for (const scoringRule of this.scoringRules) {
            const score = scoreboardData[scoringRule.name];
            if (scoringRule.name === scoringRuleName) {
                score.scored = true;
            } else if (!score.scored) {
                score.value = 0;
            }
        }
    }
}

export default new Scoring();
