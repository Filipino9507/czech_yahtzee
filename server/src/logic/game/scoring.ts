import Game from "cys/models/game/game";
import { ScoreboardData } from "cys/models/game/score";
import { DiceValue } from "cys/models/game/dice";

const getValueCounts = (values: DiceValue[]) => {
    const valueCounts = new Map();
    for (const value of values) {
        if (!valueCounts.has(value)) {
            valueCounts.set(value, 0);
        }
        valueCounts.set(value, valueCounts.get(value) + 1);
    }
    return valueCounts;
};

const calculateWithPredicate = (
    values: DiceValue[],
    predicate: (diceValue: DiceValue) => boolean
) => {
    let result = 0;
    for (const value of values) {
        if (predicate(value)) {
            result += value;
        }
    }
    return result;
};

const calculateGroups = (values: DiceValue[], group: number) => {
    const valueCounts = getValueCounts(values);
    for (const value of Array.from(valueCounts.keys())) {
        let count;
        do {
            count = valueCounts.get(value);
            valueCounts.set(value, count - group);
        } while (count > 0);
        if (count !== 0) {
            return 0;
        }
    }
    return values.reduce((a, b) => a + b, 0);
};

const calculateTriangle = (values: DiceValue[], type: "small" | "large") => {
    const valueCounts = getValueCounts(values);
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
    const requiredCounts = type === "small" ? [3, 2, 1] : [1, 2, 3];
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
};

const calculateRun = (values: DiceValue[]) => {
    const visited = new Array(6).fill(false);
    for (let i = 0; i < 6; ++i) {
        if (visited[values[i] - 1]) {
            return 0;
        }
        visited[values[i] - 1] = true;
    }
    return 21;
};

const calculateSingleGroup = (values: DiceValue[], group: number) => {
    const valueCounts = getValueCounts(values);
    for (const value of Array.from(valueCounts.keys())) {
        const count = valueCounts.get(value);
        if (count === group) {
            return count * value;
        }
    }
    return 0;
};

const updateScores = (values: DiceValue[], scoreboardData: ScoreboardData) => {
    if (values.length !== 6) {
        throw new Error("Incorrect number of dice for scoring.");
    }
    scoreboardData.ones.value = calculateWithPredicate(values, (v) => v === 1);
    scoreboardData.twos.value = calculateWithPredicate(values, (v) => v === 2);
    scoreboardData.threes.value = calculateWithPredicate(values, (v) => v === 3);
    scoreboardData.fours.value = calculateWithPredicate(values, (v) => v === 4);
    scoreboardData.fives.value = calculateWithPredicate(values, (v) => v === 5);
    scoreboardData.sixes.value = calculateWithPredicate(values, (v) => v === 6);

    scoreboardData.small.value = calculateWithPredicate(values, (v) => v <= 3);
    scoreboardData.large.value = calculateWithPredicate(values, (v) => v >= 4);
    scoreboardData.odd.value = calculateWithPredicate(values, (v) => v % 2 === 1);
    scoreboardData.even.value = calculateWithPredicate(values, (v) => v % 2 === 0);

    scoreboardData.doubles.value = calculateGroups(values, 2);
    scoreboardData.triples.value = calculateGroups(values, 3);
    scoreboardData.smallTriangle.value = calculateTriangle(values, "small");
    scoreboardData.largeTriangle.value = calculateTriangle(values, "large");

    scoreboardData.run.value = calculateRun(values);
    scoreboardData.poker.value = calculateSingleGroup(values, 5);
    scoreboardData.general.value = calculateSingleGroup(values, 6);
};

const score = (game: Game) => {
    const diceValues = game.dice.map((d) => d.value);
    const currentPlayer = game.players[game.playerTurn];
    updateScores(diceValues, currentPlayer.scoreboardData);
};

export const forTesting = {
    calculateWithPredicate,
    calculateGroups,
    calculateTriangle,
    calculateRun,
    calculateSingleGroup,
};
export default score;
