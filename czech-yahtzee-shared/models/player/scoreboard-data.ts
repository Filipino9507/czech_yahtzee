import Score from "./score";

export default interface ScoreboardData {
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