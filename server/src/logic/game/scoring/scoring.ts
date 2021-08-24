import { Score, ScoreboardData, ScoreboardDataKey } from "cys/models/game/score";
import { DiceValue } from "cys/models/game/dice";

import ScoringRule from "./scoring-rule";
import MultipleGroupsScoringRule from "./multiple-groups-scoring-rule";
import PredicateScoringRule from "./predicate-scoring-rule";
import TriangleScoringRule from "./triangle-scoring-rule";
import RunScoringRule from "./run-scoring-rule";
import SingleGroupScoringRule from "./single-group-scoring-rule";

const scoringRules: ScoringRule[] = [
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

const clearPeekedScores = (scoreboardData: ScoreboardData) => {
    for (const scoringRule of scoringRules) {
        const score = scoreboardData[scoringRule.name];
        if (!score.scored) {
            score.value = 0;
        }
    }
};

export const peekScores = (diceValues: DiceValue[], scoreboardData: ScoreboardData) => {
    clearPeekedScores(scoreboardData);
    for (const scoringRule of scoringRules) {
        const score = scoreboardData[scoringRule.name];
        if (!score.scored) {
            score.value = scoringRule.calculateScore(diceValues);
        }
    }
}

export const setScore = (scoringRuleName: ScoreboardDataKey, scoreboardData: ScoreboardData) => {
    for (const scoringRule of scoringRules) {
        const score = scoreboardData[scoringRule.name];
        if (scoringRule.name === scoringRuleName) {
            score.scored = true;
            break;
        }
    }
    clearPeekedScores(scoreboardData);
};

export const calculateTotalScore = (scoreboardData: ScoreboardData) => {
    let totalScore = 0;
    for (const scoringRuleName in scoreboardData) {
        totalScore += scoreboardData[scoringRuleName as ScoreboardDataKey].value;
    }
    return totalScore;
};
