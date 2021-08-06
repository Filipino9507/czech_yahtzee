export interface Score {
    value: number;
    passed: boolean;
}

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

export const getDefaultScore = (): Score => ({ value: 0, passed: false });
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
        general: getDefaultScore()
    }
};



