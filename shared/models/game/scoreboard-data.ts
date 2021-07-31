import SerializableConvertible from "../seriazable-convertible";
import Score from "./score";

const init = (): Score => ({ value: 0, passed: false });

export interface ScoreboardDataSerializable {
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

export default class ScoreboardData implements SerializableConvertible<ScoreboardDataSerializable> {
    public ones: Score = init();
    public twos: Score = init();
    public threes: Score = init();
    public fours: Score = init();
    public fives: Score = init();
    public sixes: Score = init();

    public small: Score = init();
    public large: Score = init();
    public odd: Score = init();
    public even: Score = init();
    public doubles: Score = init();
    public triples: Score = init();

    public smallTriangle: Score = init();
    public largeTriangle: Score = init();
    public run: Score = init();
    public poker: Score = init();
    public general: Score = init();

    public toSerializable(): ScoreboardDataSerializable {
        return { ...this } as ScoreboardDataSerializable;
    } 
}