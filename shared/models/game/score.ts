export interface Score {
    value: number;
    scored: boolean;
}

export type ScoreboardDataKey = keyof ScoreboardData;
export interface ScoreboardData {
    ones: Score;
    twos: Score;
    threes: Score;
    fours: Score;
    fives: Score;
    sixes: Score;
    small: Score;
    large: Score;
    odd: Score;
    even: Score;
    doubles: Score;
    triples: Score;
    smallTriangle: Score;
    largeTriangle: Score;
    run: Score;
    poker: Score;
    general: Score;
}

export const getDefaultScore = (): Score => ({ value: 0, scored: false });
export const getDefaultScorebordData = (): ScoreboardData => {
    return {
        ones: getDefaultScore(),
        twos: getDefaultScore(),
        threes: getDefaultScore(),
        fours: getDefaultScore(),
        fives: getDefaultScore(),
        sixes: getDefaultScore(),
        small: getDefaultScore(),
        large: getDefaultScore(),
        odd: getDefaultScore(),
        even: getDefaultScore(),
        doubles: getDefaultScore(),
        triples: getDefaultScore(),
        smallTriangle: getDefaultScore(),
        largeTriangle: getDefaultScore(),
        run: getDefaultScore(),
        poker: getDefaultScore(),
        general: getDefaultScore(),
    };
};

export const SCORING_RULE_COUNT = Object.keys(getDefaultScorebordData()).length;
