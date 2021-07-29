import Score from "./score";

export default class ScoreboardData {
    public ones: Score = { value: 0, passed: false };
    public twos: Score = { value: 0, passed: false };
    public threes: Score = { value: 0, passed: false };
    public fours: Score = { value: 0, passed: false };
    public fives: Score = { value: 0, passed: false };
    public sixes: Score = { value: 0, passed: false };

    public small: Score = { value: 0, passed: false };
    public large: Score = { value: 0, passed: false };
    public odd: Score = { value: 0, passed: false };
    public even: Score = { value: 0, passed: false };
    public doubles: Score = { value: 0, passed: false };
    public triples: Score = { value: 0, passed: false };

    public smallTriangle: Score = { value: 0, passed: false };
    public largeTriangle: Score = { value: 0, passed: false };
    public run: Score = { value: 0, passed: false };
    public poker: Score = { value: 0, passed: false };
    public general: Score = { value: 0, passed: false };
}